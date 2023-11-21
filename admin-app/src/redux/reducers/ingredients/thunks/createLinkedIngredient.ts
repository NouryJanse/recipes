import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import RootState from '../../../../types/RootState'

async function linkIngredientAPI(recipeIngredient: RecipeIngredient, token: string): Promise<Recipe> {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/ingredients/recipe`,
    {
      ...(recipeIngredient.name && { name: recipeIngredient.name }),
      authorId: recipeIngredient.authorId,
      recipeId: recipeIngredient.recipeId,
      ingredientId: recipeIngredient.ingredientId,
      amount: recipeIngredient.amount,
      unit: recipeIngredient.unit,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

const linkIngredientToRecipeThunk = createAsyncThunk(
  'ingredients/linkIngredientToRecipe',
  async (data: RecipeIngredient, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const user: User = state.userSlice?.data?.user
    const response = await linkIngredientAPI({ ...data, authorId: user.sub }, user.token)
    return response
  },
)

export default linkIngredientToRecipeThunk
