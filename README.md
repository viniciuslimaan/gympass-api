# Gympass API

API de academias semelhante ao Gympass, contando com sistema de check-in e de listar academias próximas de acordo com a localização. 

O projeto foi feito utilizando **Testes Unitários**, **Testes E2E (end-to-end)**, **CI (Continuous Integration)** utilizando o GitHub Actions e princípio **SOLID**. 

## 🛠️ Tecnologias utilizadas

- Typescript
-   NodeJs
    - Fastify
    - Zod
    - Dayjs
    - Prisma
    - Vitest
    - Supertest
-   PostgreSQL
-   Docker

## 🚀 Rodando localmente

Para visualizar em seu computador use:

```
git clone https://github.com/viniciuslimaan/gympass-api.git
```

```
cd gympass-api
```

```
npm i
```

```
docker compose start
```

```
npx prisma migrate dev
```

```
npm start dev
```

## ⚙️ Variáveis de ambiente

Para utilizar essa aplicação, basta apagar o '.example' do arquivo '.env.example' podendo tanto deixar como está, quanto editando de acordo com sua necessidade.

## 📄 Postman

É possível testar o projeto sem ter o FrontEnd, basta usar o [Postman](https://www.postman.com). Os arquivos para importação (collection e environment) estão localizados na pasta 'libs'.

## 🎲 Banco

O banco de dados é gerado através do comando `docker compose start` (lembrando que o Docker precisa estar instalado e executado) e as tabelas são geradas automaticamente pelo prisma utilizando o comando `npx prisma migrate dev`.