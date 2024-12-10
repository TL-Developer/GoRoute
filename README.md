# GoRoute
Projeto de gerenciamento de rotas de entrega em tempo real, integrada ao Google Maps que fornece atualizações ao vivo, previsão de chegadas, monitoramento das entregas e calculo do frente. utilizando NestJS, NextJS, NodeJS, Typescript, ReactJS, GoLang, Apache Kafka, MongoDB, Websocket e TailwindCSS

## System Design

### Criação de novas rotas

![alt text](image.png)

### Calculo de frete

![alt text](image-1.png)

### Iniciar processo de entrega

![alt text](image-2.png)

### Simulação do processo de entrega

![alt text](image-3.png)

## How to start all the projects with Docker

```docker compose up ```

or with --build to build all services

```docker compose up --build ```

### NestJS

To run the project use the command below and running on port 3000

```cd nestjs-api && npm run start:dev```

All examples into **nestjs-api/api.http**

To run in Docker rede

```docker compose exec nestjs sh``` && ```npm run start:dev```

To run with repl

```npm run start:repl```

Ex: await get(RoutesService).findAll()
