# Imagem do banco (PostgreSQL) já configurada para o Easy Eats.
FROM postgres:18-alpine

ENV POSTGRES_DB=easy_eats \
    TZ=America/Sao_Paulo

# Scripts executados só na primeira subida, com o volume de dados vazio.
COPY init/ /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=5s --timeout=5s --retries=10 \
    CMD pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" || exit 1
