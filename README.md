# Contacts API GraphQL

## Introdução

Este é um projeto de API GraphQL desenvolvido em NestJS que oferece funcionalidades para criar, buscar, atualizar e deletar contatos em um banco de dados PostgreSQL. O projeto utiliza o framework NestJS com a abordagem "code first" para definir os tipos e resolvers GraphQL. Além disso, o TypeORM é usado para interagir com o banco de dados PostgreSQL. O Docker Compose é fornecido para simplificar a configuração do banco de dados. Testes unitários foram implementados com o uso de stubs para garantir a qualidade do código.

## Pré-requisitos

Antes de começar, verifique se você atende aos seguintes requisitos:

- [Node.js](https://nodejs.org/): Certifique-se de que o Node.js está instalado na sua máquina.
- [Docker](https://www.docker.com/): Você precisará do Docker para configurar um contêiner PostgreSQL.

## Instalação

1. Clone este repositório em sua máquina local:

    ```bash
    git clone https://github.com/WesleyRafaelp/contacts-api-graphQL.git
    cd contacts-api-graphQL
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

3. Configure o banco de dados PostgreSQL usando Docker Compose. Certifique-se de ter o Docker instalado em sua máquina. Execute o seguinte comando na raiz do projeto:

    ```bash
    docker-compose up -d
    ```

## Uso

Para iniciar o servidor de desenvolvimento e executar a API, use o seguinte comando:

```bash
npm run start
```

O servidor estará em execução em [http://localhost:3000/graphql](http://localhost:3000/graphql), onde você pode acessar a interface GraphQL Playground para testar as consultas e mutações.



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
