# Recipes

## About

Welcome to my recipe app 🥗! Thank you for taking the time to read this document 🙏!
An app that generates groceries shopping lists from recipes. Recipes that you can create yourself or pick from the database of inspiring recipes by others. Note that this app is a work in progress and that its purpose is mostly to demonstrate my experience, current skillset at last but not least: interests as an engineer 🧑‍💻. Please refer to some screenshots below.

NOTE: 🚨 **it's not possible to run this app locally without a Cloudinary, a Auth0 account and a PostgreSQL database. Please ask me for a demo. 🚨**

## Demo screenshots

![Homescreen on SM size](screens/Home-SM.png?raw=true "Homescreen SM")
![Create recipe page on MD size](screens/CreateRecipe-MD.png?raw=true "Create recipe MD")
![Homescreen on XL size with menu expanded](screens/Home-XL.png?raw=true "Home XL")
![Recipes overview on SM size](screens/Recipes-SM.png?raw=true "Recipes SM")
![Create ingredient on XL size](screens/CreateIngredient-XL.png?raw=true "Create ingredient XL")
![Ingredients overview on XL size](screens/AllIngredients-XL.png?raw=true "All ingredients XL")

## Creator application

Roadmap features

- an account environment
- creator feature for new and managing recipes
- managing ingredients

_This application is currently being developed._

## Consumer application

Roadmap features

- a recipes overview list
- a recipes detail page which shows how to cook using the recipe
- a shopping list feature that allows users to generate shopping lists for doing groceries

## Work management

**[🗓 Backlog of current work can be found here](https://github.com/NouryJanse/recipes/projects/1)**

**[🗓 Roadmap of future features can be found here](https://github.com/NouryJanse/recipes/projects/3)**

## Architecture plan

A creator single page web app

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/) with [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/en/main)
- [Styled Components](https://styled-components.com/)
- [Tailwind](https://tailwindcss.com/docs/) styling
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/) x [React Testing Library UI](https://testing-library.com/) and Unit tests (such as data transformations or functionality)
- [MUI React Table](https://mui.com/material-ui/react-table/) for rows, sorting and filtering
- [Downshift](https://www.downshift-js.com/) for autocompletion

A data platform that allows multichannel access

- Fastify back-end
- Prisma
- Server side communication from REST to
  > https://github.com/mercurius-js/mercurius
- Jest Unit and Integration test

A consumer high performance website

- Next.js setup that functions as a consumer of the data
- Static Rendering / ISR?

## Back-End Justifications

#### SQL

- PostgreSQL: SQL is best for relationships between entities, postgresql is known for it's enterprise reliability and vast featureset

#### ORM's

- Prisma: big investors, serious continuous development, nice abstraction over SQL layer
- Other considered options: Sequelize, TypeORM, Mongoose

#### Frameworks

- Fastify: very high performance routing
- Considered: Nestjs, AdonisJS, Express, Meteor, Koa, Hapi

#### Logging

To be implemented in the future:

- Datadog
- Sentry
- Logrocket

### Moving to GraphQL (Plan for the future)

- Relay
- Apollo

## Testing Strategy

### Front-End

- Unit tests ...
- UI tests ...

### Back-End

- Unit tests ...
- Integration tests ...

## Storybook

Storybook is a work in progress

## Swagger docs on the API

Swagger documentation can be found by navigating to /docs

## Additional notes

- 🚨 Storybook is broken because of [incompatibility with React v18](https://github.com/storybookjs/storybook/issues/17831)
  > Construction on the Storybook therefore on hold
- 🚨 Currently testing is under construction, plans are to test the BE extensively through:

  > integration testing (on the routing and underlying functionality)

  > unit testing the Prisma models and expected behaviours

![Home on Mobile](/screens/Home-SM.png)
![Home on Desktop](/screens/Home-XL.png)
![All recipes](/screens/Recipes-SM.png)
![Create Recipe](/screens/Create-MD.png)
