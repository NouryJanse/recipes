import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getRecipeAPI(recipeId: number): Promise<Recipe> {
  const response = await axios.get(`http://localhost:1337/api/recipes/${recipeId}`)
  return response.data
}

const getRecipeThunk = createAsyncThunk('recipes/getRecipe', async (recipeId: number) => {
  return getRecipeAPI(recipeId)
})

export default getRecipeThunk
