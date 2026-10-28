# syntax=docker/dockerfile:1

# Imagem do front (Angular servido pelo nginx). O código vem da raiz deste
# repositório, entregue pelo docker-compose como o contexto nomeado "app".

# ---- Build: gera o bundle de produção do Angular ----
FROM node:22-alpine AS build
WORKDIR /app

COPY --from=app package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY --from=app angular.json tsconfig.json tsconfig.app.json ./
COPY --from=app public ./public
COPY --from=app src ./src
# Configuração "production": usa environment.prod.ts (apiUrl = '/api').
RUN npx ng build --configuration production

# ---- Runtime: nginx serve os arquivos e repassa /api para o backend ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
