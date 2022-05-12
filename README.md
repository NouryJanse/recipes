# Recipes

## About

An app that generates groceries shopping lists from recipes. Recipes that you can create yourself or pick from the database of inspiring recipes by others.

## Web app Front-End

- an account environment
- creator feature for new and maintenance of recipes

## Consumer Front-End

Roadmap features:

- a recipes overview list
- a recipes detail page which shows how to cook using the recipe
- a shopping list feature that allows users to generate shopping lists for doing groceries

- [Backlog of current work can be found here](https://github.com/NouryJanse/recipes/projects/1)
- [Roadmap of future features can be found here](https://github.com/NouryJanse/recipes/projects/3)

## Back-End

#### SQL

- PostgreSQL: SQL is best for relationships between entities, postgresql is known for it's enterprise reliability and vast featureset

#### ORM's

- Prisma: big investors, serious continuous development, nice abstraction over SQL layer
- Other considered options: Sequelize, TypeORM, Mongoose

#### Frameworks

- Fastify: high performance routing
- Considered: Nestjs, AdonisJS, Express, Meteor, Koa, Hapi

#### Logging

To be implemented in the future:

- Datadog
- Sentry
- Logrocket

## Architecture plan

A creator single page web app

- React
- Redux with Redux Toolkit
- React Router
- Styled Components
- Tailwind styling
- Axios

A data platform that allows multichannel communication

- Fastify back-end
- Prisma
- Server side communication from REST to GraphQL

A consumer high performance website

- Next consumer
- Static Render / ISR

## Storybook

Storybook is a work in progress

## Swagger docs on the API

Swagger documentation can be found at /docs

## Additional notes

- Storybook is broken because of incompatibility with React v18
-
