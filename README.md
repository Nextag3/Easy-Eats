# Easy Eats

Sistema de gestão para restaurantes: comandas, pedidos, cozinha, caixa,
estoque, cardápio e financeiro.

O projeto tem dois repositórios:

| Repositório      | Conteúdo                                                     |
|------------------|--------------------------------------------------------------|
| `Easy-Eats`      | Frontend (Angular) + todo o ambiente Docker (este repo)      |
| `Easy-Eats-Api`  | Backend (Spring Boot 4 / Java 17)                            |

## Arquitetura Docker

Cada componente tem sua pasta, seu `Dockerfile` e sua imagem:

```
Easy-Eats/
├── docker-compose.yaml        orquestra os 3 serviços, redes e volume
├── .env.example               variáveis de ambiente (copiar para .env)
└── docker/
    ├── banco/
    │   ├── Dockerfile         PostgreSQL 18 com o banco easy_eats
    │   └── init/
    │       ├── 01-schema.sql  criação das 27 tabelas do sistema
    │       └── 02-timezone.sql
    ├── backend/
    │   └── Dockerfile         build da API (código do repo Easy-Eats-Api)
    └── frontend/
        ├── Dockerfile         build do Angular + nginx
        └── nginx.conf         serve o front e repassa /api ao backend
```

```
 navegador ──:8000──▶ frontend (nginx) ──rede-frontend──▶ backend (API :8080) ──rede-backend──▶ banco (Postgres :5432)
```

- **Comunicação entre containers:** pelos nomes dos serviços. O nginx chama
  `http://backend:8080` e a API conecta em `jdbc:postgresql://banco:5432`.
- **Redes:** `rede-frontend` (frontend ↔ backend) e `rede-backend`
  (backend ↔ banco). O frontend não tem acesso ao banco.
- **Persistência:** os dados do Postgres ficam no volume `banco-dados` e
  sobrevivem a `docker compose down`.
- Só a porta do frontend (`8000`) é exposta na máquina.

## Pré-requisitos

- Docker Desktop (ou Docker Engine) com Docker Compose v2
- Git

## 1. Clonar (os dois repositórios lado a lado)

```bash
git clone https://github.com/Nextag3/Easy-Eats.git
git clone https://github.com/Nextag3/Easy-Eats-Api.git
cd Easy-Eats
```

A pasta precisa ficar assim, porque o build do backend lê `../Easy-Eats-Api`:

```
pasta-qualquer/
├── Easy-Eats/
└── Easy-Eats-Api/
```

## 2. Configurar

```bash
cp .env.example .env
```

Edite o `.env` e preencha o `JWT_SECRET`. Para gerar uma chave:

```bash
openssl rand -base64 64 | tr -d '\r\n'
```

## 3. Construir e subir

```bash
docker compose up -d --build
```

O primeiro build leva alguns minutos (baixa dependências do Maven e do npm).
Na primeira subida o banco é criado pelos scripts de `docker/banco/init/`.

## 4. Testar

```bash
docker compose ps
```

Os três serviços devem aparecer como `running` e o `banco` como `healthy`.

Abra **http://localhost:8000** e entre com um usuário de teste:

| Perfil        | E-mail                    | Senha           |
|---------------|---------------------------|-----------------|
| Administrador | admin@easyeats.com        | admin123        |
| Super Admin   | superadmin@easyeats.com   | superadmin123   |
| Operador      | operador@easyeats.com     | operador123     |
| Garçom        | garcom@easyeats.com       | garcom123       |
| Cozinheiro    | cozinheiro@easyeats.com   | cozinheiro123   |

Teste da integração pelo terminal (frontend → backend → banco):

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@easyeats.com","senha":"admin123"}'
```

A resposta deve trazer um `token`. Para ver as tabelas no banco:

```bash
docker compose exec banco psql -U postgres -d easy_eats -c "\dt"
```

Logs de cada serviço:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f banco
```

## 5. Encerrar

```bash
docker compose down       # para e remove os containers (os dados do banco ficam)
docker compose down -v    # também APAGA o volume com os dados do banco
```

## Imagens no Docker Hub

As imagens também estão publicadas, para rodar sem fazer build:

- [`lucasmendeskoch/easy-eats-banco`](https://hub.docker.com/r/lucasmendeskoch/easy-eats-banco)
- [`lucasmendeskoch/easy-eats-backend`](https://hub.docker.com/r/lucasmendeskoch/easy-eats-backend)
- [`lucasmendeskoch/easy-eats-frontend`](https://hub.docker.com/r/lucasmendeskoch/easy-eats-frontend)

Com `DOCKERHUB_USER=lucasmendeskoch` no `.env`:

```bash
docker compose pull
docker compose up -d
```

Para publicar uma nova versão (precisa de `docker login`):

```bash
docker compose build
docker compose push
```

## Desenvolvimento sem Docker

Frontend (Angular 21, Node 22):

```bash
npm install
npx ng serve
```

O servidor de desenvolvimento usa a API em `http://localhost:8080`
(`src/environments/environment.ts`). Para o backend, veja o repositório
`Easy-Eats-Api`.
