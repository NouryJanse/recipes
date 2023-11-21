import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function ingredientAPI(ingredientId: number): Promise<Ingredient | false> {
  try {
    const url = import.meta.env.VITE_SERVER_URL as string
    const response = await axios.get(`${url}/api/ingredients/${ingredientId}`)
    return response.data
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

const getIngredientThunk = createAsyncThunk('ingredients/getIngredient', async (ingredientId: number) => {
  return ingredientAPI(ingredientId)
})

export default getIngredientThunk
