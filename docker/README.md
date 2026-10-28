# Docker do Easy Eats

Cada parte do sistema tem sua pasta e sua imagem no Docker Hub:

| Pasta       | Imagem                          | O que é                                    |
|-------------|---------------------------------|--------------------------------------------|
| `banco/`    | `<usuario>/easy-eats-banco`     | PostgreSQL 18 com o banco `easy_eats`      |
| `backend/`  | `<usuario>/easy-eats-backend`   | API Spring Boot (repo `Easy-Eats-Api`)     |
| `frontend/` | `<usuario>/easy-eats-frontend`  | Angular servido pelo nginx                 |

O navegador só fala com o `frontend`. O nginx repassa `/api/*` para o
`backend`, que acessa o `banco`. Só a porta do front fica exposta.

## Primeira vez

```bash
cd docker
cp .env.example .env
# edite o .env: DOCKERHUB_USER e JWT_SECRET (o próprio arquivo explica)
```

## Só rodar (sem código, baixando do Docker Hub)

```bash
docker compose pull
docker compose up -d
```

Acesse http://localhost:8000. Usuário de teste: `admin@easyeats.com` / `admin123`.

## Rodar com o código local (build)

Precisa dos dois repositórios lado a lado:

```
Easy-Eats/       <- este repo (front + docker/)
Easy-Eats-Api/   <- backend
```

```bash
docker compose up -d --build
```

## Publicar uma nova versão no Docker Hub

```bash
docker login
docker compose build
docker compose push
```

Para publicar com versão, defina `TAG=1.0.0` no `.env` (ou
`TAG=1.0.0 docker compose push`).

## Comandos úteis

```bash
docker compose ps                 # status dos containers
docker compose logs -f backend    # logs da API
docker compose down               # para tudo (os dados do banco ficam)
docker compose down -v            # para tudo e APAGA os dados do banco
```
