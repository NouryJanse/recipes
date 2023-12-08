import { Router } from 'express'

import ingredientRouter from './ingredients'

import createRecipe from './recipes/createRecipe'
import createRecipeImage from './recipes/createRecipeImage'
import deleteRecipeImage from './recipes/deleteRecipeImage'
import deleteRecipe from './recipes/deleteRecipe'
import getRecipe from './recipes/getRecipe'
import getRecipes from './recipes/getRecipes'
import updateRecipe from './recipes/updateRecipe'

import registerUser from './users/register'
import loginUser from './users/login'
import logoutUser from './users/logout'
import updateUser from './users/update'
import deleteUser from './users/delete'
import validateToken from './users/validateToken'

let apiRouter = Router().use('/', [
  createRecipe,
  createRecipeImage,
  deleteRecipeImage, // this order is important, for execution of the routes (first image then recipe deletion)
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
  ingredientRouter,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  validateToken,
])

export default apiRouter
