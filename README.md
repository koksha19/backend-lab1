# NestJS Healthcheck Service

## Description
Simple NestJS service with `/healthcheck` endpoint, Docker, and Render deployment.

## Install & Run Locally
```bash
npm install
npm run start:dev
```

## Run with Docker
```bash
docker build -t backend-lab1 .
docker run -p 3000:3000 backend-lab1
```

## Run with Docker Compose
```bash
docker-compose up --build
```