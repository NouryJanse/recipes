import { Router } from 'express'

import createRecipe from './recipes/createRecipe'
import getRecipes from './recipes/getRecipes'
import recipesRouter from './recipes'
import ingredientRouter from './ingredients'

import registerUser from './users/register'
import loginUser from './users/login'
import logoutUser from './users/logout'
import updateUser from './users/update'
import deleteUser from './users/delete'

let apiRouter = Router().use('/', [
  createRecipe,
  getRecipes,
  recipesRouter,
  ingredientRouter,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
])

export default apiRouter
