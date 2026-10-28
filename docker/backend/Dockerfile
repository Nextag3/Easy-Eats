# syntax=docker/dockerfile:1

# Imagem da API (Spring Boot). O código vem do repositório Easy-Eats-Api,
# entregue pelo docker-compose como o contexto nomeado "api".

# ---- Build: compila o jar com Maven (mesma versão do wrapper do projeto) ----
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY --from=api pom.xml .
# Dependências numa camada própria: só baixa de novo quando o pom.xml muda.
RUN --mount=type=cache,target=/root/.m2 mvn -q -B dependency:go-offline

COPY --from=api src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -q -B -DskipTests package \
    && cp target/eats-*.jar app.jar

# ---- Runtime: só a JRE e o jar, rodando sem root ----
FROM eclipse-temurin:17-jre
WORKDIR /app

# Mesmo fuso do restaurante, para horários de caixa e pedidos baterem.
ENV TZ=America/Sao_Paulo

RUN groupadd --system spring && useradd --system --gid spring spring
COPY --from=build /app/app.jar app.jar
USER spring

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
