import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getRecipeAPI(): Promise<Recipe> {
  const response = await axios.get('http://localhost:1337/api/recipes')
  return response.data
}

const getRecipeThunk = createAsyncThunk('recipes/getRecipe', async () => {
  return getRecipeAPI()
})

export default getRecipeThunk
