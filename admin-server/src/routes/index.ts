import { Router } from 'express'

import createRecipe from './recipes/createRecipe'
import createRecipeImage from './recipes/createRecipeImage'
import deleteRecipe from './recipes/deleteRecipe'
import deleteRecipeImage from './recipes/deleteRecipeImage'
import getRecipe from './recipes/getRecipe'
import getRecipes from './recipes/getRecipes'
import updateRecipe from './recipes/updateRecipe'
import ingredientRouter from './ingredients'

import registerUser from './users/register'
import loginUser from './users/login'
import logoutUser from './users/logout'
import updateUser from './users/update'
import deleteUser from './users/delete'

let apiRouter = Router().use('/', [
  createRecipe,
  createRecipeImage,
  deleteRecipe,
  deleteRecipeImage,
  getRecipe,
  getRecipes,
  updateRecipe,
  ingredientRouter,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
])

export default apiRouter
