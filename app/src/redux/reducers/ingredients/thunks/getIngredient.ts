import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

async function ingredientAPI(ingredientId: number): Promise<Ingredient> {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/ingredients/${ingredientId}`,
  )
  return response.data
}

const getIngredientThunk = createAsyncThunk(
  'ingredients/getIngredient',
  async (ingredientId: number) => {
    return ingredientAPI(ingredientId)
  },
)

export default getIngredientThunk
