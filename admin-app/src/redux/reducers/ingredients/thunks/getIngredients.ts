import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getIngredientsAPI(): Promise<Ingredient[] | false> {
  try {
    const url = import.meta.env.VITE_SERVER_URL as string
    const response = await axios.get(`${url}/api/ingredients`)
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

const getIngredientsThunk = createAsyncThunk('ingredients/getIngredients', async () => {
  return getIngredientsAPI()
})

export default getIngredientsThunk
