# Recipes

## About

...

## Architectural considerations

## Web app Front-End

- React
- Redux with Redux Toolkit
- React Router
- Styled Components
- Axios

## Consumer Front-End

> This features:

- a recipes overview list
- a recipes detail page which shows how to cook using the recipe
- a shopping list feature that allows users to generate shopping lists for doing groceries

- Next.js

### Back-End

- PostgreSQL: SQL is best for relationships between entities, postgresql is known for it's enterprise reliability and vast featureset

#### ORM's

- Prisma: big investors, serious continuous development, nice abstraction over SQL layer
- Other considered options: Sequelize, TypeORM, Mongoose

#### Frameworks

- Fastify: high performance routing
- Considered: Nestjs, AdonisJS, Express, Meteor, Koa, Hapi

#### Logging

- Sentry
- Logrocket
- Datadog

#### Architecture plan

- React web app
- Redux

- Fastify back-end
- Prisma
- Server side communication from REST to GraphQL

- Next consumer
- Static Render / ISR
