import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import LogHelper from '../../../../helpers/LogHelper'
import RootState from '../../../../types/RootState'

const updateRecipeIngredientAPI = async (data: RecipeIngredient, token: string): Promise<Ingredient | false> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/ingredients/recipe/${data.recipeId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    LogHelper({ logType: 'error', message: 'An error occurred' })
    return false
  }
}

const updateRecipeIngredientThunk = createAsyncThunk(
  'ingredients/updateIngredient',
  async (data: RecipeIngredient, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const user = state.userSlice?.data?.user
    return updateRecipeIngredientAPI({ ...data }, user.token)
  },
)

export default updateRecipeIngredientThunk
