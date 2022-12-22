import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function getIngredientsAPI(): Promise<Recipe[]> {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/ingredients`)
  return response.data
}

const getIngredientsThunk = createAsyncThunk('ingredients/getIngredients', async () => {
  return getIngredientsAPI()
})

export default getIngredientsThunk
