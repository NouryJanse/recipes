import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import RootState from '../../../../types/RootState'

async function createIngredientAPI(ingredient: Ingredient, token: string): Promise<Ingredient> {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/ingredients`,
    {
      name: ingredient.name,
      unit: ingredient.unit,
      calorieCount: Number(ingredient.calorieCount),
      published: ingredient.published,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

const createIngredientThunk = createAsyncThunk('ingredients/createIngredient', async (data: Ingredient, thunkApi) => {
  const state = thunkApi.getState() as RootState
  const user: User = state.userSlice?.data?.user
  const response = await createIngredientAPI({ ...data }, user.token)
  return response
})

export default createIngredientThunk
