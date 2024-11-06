# CRUD_Angular_NestJs

This project is a basic CRUD using [Angular CLI](https://github.com/angular/angular-cli) and [NestJs CLI](https://github.com/nestjs/nest)

## 💻 Tecnologies

- NodeJs
- NestJs
- Sqlite
- Jest + Supertest (back-end tests)
- Angular v18
- Angular Material
- Karma + Jasmine (front-end tests)

## ⌨️ Editor / IDE

- Visual Studio Code

## Some functionalities available in the API

- ✅ TypeOrm
- ✅ Sqlite database (you can use any database of your preference)
- ✅ Controller, Service, and Repository layers
- ✅ DTO (Data Transfer Object)
- ✅ Docs - Swagger (https://springdoc.org/v2/)

## ❗️Executing the code locally

You need to have Node.js / NPM installed locally.

### Executing the back-end

Open the `crud-api` project in your favorite IDE .

1. Install all the required dependencies:

```
npm install
```

2. Execute the project:

```
npm run start
```

This command will run the NestJs project, without requiring CORS.

Open your browser and access **http://localhost:3000** (NestJs default port).

### Executing the front-end

Open the `crud-angular` project in your favorite IDE .

1. Install all the required dependencies:

```
npm install
```

2. Execute the project:

```
npm run start
```

This command will run the Angular project with a proxy to the Java server, without requiring CORS.

Open your browser and access **http://localhost:4200** (Angular default port).
