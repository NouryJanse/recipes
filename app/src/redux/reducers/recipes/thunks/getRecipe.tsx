import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getRecipeAPI() {
  const response = await axios.get('http://localhost:1337/api/recipes')
  return response.data
}

export const getRecipeThunk = createAsyncThunk('recipes/getRecipe', async (_data) => {
  const response = await getRecipeAPI()
  return response
})
