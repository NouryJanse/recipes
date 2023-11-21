import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getRecipeAPI(recipeId: number): Promise<Recipe | false> {
  try {
    const url = import.meta.env.VITE_SERVER_URL as string
    const response = await axios.get(`${url}/api/recipes/${recipeId}`)
    return response.data
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      // console.log(error.name); // the type of error
      // console.log(error.message); // the description of the error
      // console.log(error.stack); // the stack trace of the error
    }
    return false
  }
}

const getRecipeThunk = createAsyncThunk('recipes/getRecipe', async (recipeId: number) => {
  return getRecipeAPI(recipeId)
})

export default getRecipeThunk
