import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getRecipesAPI(): Promise<Recipe[]> {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/recipes`)
  return response.data
}

const getRecipesThunk = createAsyncThunk('recipes/getRecipes', async () => {
  return getRecipesAPI()
})

export default getRecipesThunk
