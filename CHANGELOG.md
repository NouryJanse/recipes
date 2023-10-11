# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2023-10-11

### Added

- Destructuring assignment for all props that are passed through the API
- Ingredient type can now be changed
- Serverside route error logging

### Changed

- Removed body-parser package as Express already has these features built-in
- Archived fastify-server, removed all .env vars for security reasons - improved .gitignore

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
