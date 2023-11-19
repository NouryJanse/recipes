# Welcome to Recipes

![Homescreen on XL size with menu expanded](_screens/Home-XL.png?raw=true "Home XL")
![Create Recipe on XL size with menu expanded](_screens/CreateRecipe-XL.png?raw=true "Create Recipe XL")

Thank you for taking the time to read. The platform's repository consists of four applications:

- admin-app
- admin-server
- client-app
- client-server

The app generates groceries shopping lists from recipes. Recipes that you can create yourself or pick from the database of inspiring recipes by others. Note that this app is a work in progress and that its purpose is mostly to demonstrate my experience, current skillset at last but not least: interests as an engineer 🧑‍💻. Please refer to some screenshots at the bottom.

🎈 **it's not possible to run this platform locally without a Cloudinary, a PostgreSQL db and a MongoDB db (which need be set in various .env files). Please contact me for a demo. 🎈**

## Creator application

Roadmap features

- an account environment
- creator feature for new and managing recipes
- managing ingredients

## Consumer application

Roadmap features

- a recipes overview list
- a recipes detail page which shows how to cook using the recipe
- a shopping list feature that allows users to generate shopping lists for doing groceries

🛣️ **[Roadmap of future features can be found here](https://github.com/users/NouryJanse/projects/4)**

## Architecture plan

A creator single page web app

- [React](https://reactjs.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Jest](https://www.npmjs.com/package/jest)
- [MUI React Table](https://mui.com/material-ui/react-table/)
- [React-Select](https://www.npmjs.com/package/react-select)
- [React Redux](https://www.npmjs.com/package/react-redux)
- [React Router](https://www.npmjs.com/package/react-router)
- [React Testing Library](https://www.npmjs.com/package/@testing-library/react)
- [Redux Toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
- [Tailwind](https://www.npmjs.com/package/tailwindcss)

A data platform that allows multichannel access

- [Express](https://www.npmjs.com/package/express)
- [CORS](https://www.npmjs.com/package/cors)
- [Cloudinary](https://www.npmjs.com/package/cloudinary)
- [Jest](https://www.npmjs.com/package/jest)
- [Prisma](https://www.npmjs.com/package/prisma)
- [Prisma Client](https://www.npmjs.com/package/@prisma/client)

A consumer high performance website

- [Astro](https://astro.build/)
- [MongoDB](https://www.npmjs.com/package/mongodb)
- [Socket IO Client](https://www.npmjs.com/package/socket.io-client)
- [Tailwind](https://www.npmjs.com/package/tailwindcss)

A lightweight server for sockets and MongoDB storage

- [Express](https://www.npmjs.com/package/express)
- [Compression](https://www.npmjs.com/package/compression)
- [MongoDB](https://www.npmjs.com/package/mongodb)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Socket IO](https://www.npmjs.com/package/socket.io)

## Demo screenshots

![Homescreen on SM size](_screens/Home-SM.png?raw=true "Homescreen SM")
![Create recipe page on XL size](_screens/CreateRecipe-XL.png?raw=true "Create recipe XL")
![Recipes overview on SM size](_screens/Recipes-SM.png?raw=true "Recipes SM")
![Create ingredient on LG size](_screens/CreateIngredient-LG.png?raw=true "Create ingredient LG")
![Ingredients overview on LG size](_screens/AllIngredients-LG.png?raw=true "All ingredients LG")
