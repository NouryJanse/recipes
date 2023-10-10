import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getRecipesAPI(): Promise<Recipe[] | false> {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/recipes`)
    if (response && response.data && Array.isArray(response.data)) {
      return response.data
    }
    throw new Error('No response or array of data returned')
  } catch (error) {
    // console.log(error)

    if (error instanceof Error) {
      // console.log(error.name); // the type of error
      // console.log(error.message); // the description of the error
      // console.log(error.stack); // the stack trace of the error
    }
    return false
  }
}

const getRecipesThunk = createAsyncThunk('recipes/getRecipes', async () => {
  return getRecipesAPI()
})

export default getRecipesThunk
