# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2023-10-12

### Added

- react-select creatable for linking existing and new ingredients to recipes
- Server improvement on creating and linking an ingredient in one API call
- Amount of new recipes (< 7 days createdAt) now shown in menu bar

### Changed

- Improved folder structure for the RecipeIngredients
- Refactored add new ingredient front end into one clever block vs adding a new one and a separate existing list

### Fixed

- Fixed a bug where recipe status and course would be reset due to passing them empty to the API

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
