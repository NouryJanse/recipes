import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getRecipesAPI(): Promise<Recipe[]> {
  const response = await axios.get('http://localhost:1337/api/recipes')
  return response.data
}

const getRecipesThunk = createAsyncThunk('recipes/getRecipes', async () => {
  return getRecipesAPI()
})

export default getRecipesThunk
