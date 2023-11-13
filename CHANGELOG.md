# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2023-11-13

### Added

- Redirect when JWT is expired
- Redirects from /login /register when logged in
- More SCSS Scales for improved precision in styling
- Improved the recipes' app face 😁

### Changed

- Removed middleware

### Fixed

- Sorting bug
- TS warnings

## [0.0.1] - 2023-11-12

### Added

- Server deployments on Vercel are now working

## [0.0.1] - 2023-11-11

### Added

- Basic authentication and registration with JWT

## [0.0.1] - 2023-11-10

### Changed

- Upgraded Astro to latest version

## [0.0.1] - 2023-11-09

### Added

- Custom styling implementation setup

### Changed

- New shopping item moved to the modal

## [0.0.1] - 2023-11-08

### Added

- Full functionality restored to Astro project
- Deployment on Vercel

## [0.0.1] - 2023-11-06

### Added

- Astro here we come 🚀 🌑

## [0.0.1] - 2023-10-25

### Added

- Bootstrap templating for the Recipe Detail page

### Changed

- Improved app UI and refactored+reduced SCSS files
- Created a Menu component and a Sidebar component

## [0.0.1] - 2023-10-24

### Changed

- UI now makes a drastic distinction between various mobile device screen resolutions and full desktop resolutions

## [0.0.1] - 2023-10-23

### Changed

- Improved the README

## [0.0.1] - 2023-10-19

### Added

- Added SASS preprocessing with Concurrently
- Main functionality of the shopping list is now done
  - Checked items are now shown on the bottom of the list
  - Items are synced blazingly fast to local storage, a database and in sync with Socket IO
  - Ingredients are fetched from the admin-server (creation part of the platform)
  - Login and user accounts are yet to be built
  - Recipes are also fetched from API
- Separate CSS files to improve the look and feel of the app more easily
- Added highlight styling feature for new items

### Changed

- Cleanup of dirty code: logs, any's, etc.
- Moved important variables to .env vars
- Improved the updateArrayWithObjectById by bringing in generic typing
- Refactored sidebar into Sidebar component

## Deleted

- A permanent goodbye to Fastify with the removal of \_fastify_server

## [0.0.1] - 2023-10-18

### Added

- Permanent persistence implemented through a very fast service Atlas MongoDB
- Separate functions that process data in the helpers folder

### Changed

- Amount and checked state can now be updated from the list
- Disabled React StrictMode because of double renders and thus double data calls
- Improved client-server with functionality to process data

## [0.0.1] - 2023-10-17

### Added

- Renamed folders into understandable server and client folders for either the app or the server of both application domains
- Implemented Socket.io through a simple and basic socket server in the 'client-server' folder.
- A shopping list can now be created and propagated with 'amount', 'unit' and the 'ingredient'
  - It is synced to local storage
  - It is synced to other subscribers via Socket.io
- The Remix app is styled with TailwindCSS and Ant Design Component Library
- Extracted Recipe types to a new custom made public @nouryjanse/recipe-types NPM module

### Changed

- Removed @types/vite from tsconfig.json in the 'app' folder, it is not needed with the newest versions of Vite

## [0.0.1] - 2023-10-16

### Added

- Migrated from CRA to Vite because of its' blazing fast performance

## [0.0.1] - 2023-10-12

### Added

- react-select creatable for linking existing and new ingredients to recipes
- Server improvement on creating and linking an ingredient in one API call
- Amount of new recipes (< 7 days createdAt) now shown in menu bar
- Ingredients can now be deleted from the ingredients page
- Finished the Remix.run Tutorial in the folder /site

### Changed

- Improved folder structure for the RecipeIngredients
- Refactored add new ingredient front end into one clever block vs adding a new one and a separate existing list

### Fixed

- Fixed a bug where recipe status and course would be reset due to passing them empty to the API
- Minor bugfix improvents the UX

## [0.0.1] - 2023-10-11

### Added

- Destructuring assignment for all props that are passed through the API
- Ingredient type can now be changed
- Serverside route error logging
- Fixed image upload to Cloudinary
- Recipe can be published via edit recipe page

### Changed

- Removed body-parser package as Express already has these features built-in
- Archived fastify-server, removed all .env vars for security reasons - improved .gitignore
- Now 10 MB attachments may be sent to the server
- Corrected server entity `RecipeIngredients` to `RecipeIngredient`
- Re-organised the app pages folder and moved it to the root /src folder for improved DX

### Fixed

- Larger description text length: from 500 to 2000 characters.

## [0.0.1] - 2023-10-10

### Added

- Refactored folder structure for Recipe and Ingredient domains
- New Redux and Redux Toolkit versions: refactored the builder from Redux into new situation

### Changed

- Disabled Auth0 temporarily, will implement authentication without dependencies on overly complex auth implementation
- Refactored LinkedImages into a separate component to allow for more overview on the EditRecipe page

## [0.0.1] - 2023-10-09

### Changed

- Moved away from Fastify to barebone Express
