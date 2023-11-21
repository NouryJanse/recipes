import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getRecipesAPI(): Promise<Recipe[] | false> {
  try {
    const url = import.meta.env.VITE_SERVER_URL as string
    const response = await axios.get(`${url}/api/recipes`)
    if (response && response.data && Array.isArray(response.data)) {
      return response.data
    }
    throw new Error('No response or array of data returned')
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      // console.error(error.name); // the type of error
      // console.error(error.message); // the description of the error
      // console.error(error.stack); // the stack trace of the error
    }
    return false
  }
}

const getRecipesThunk = createAsyncThunk('recipes/getRecipes', async () => {
  return getRecipesAPI()
})

export default getRecipesThunk
