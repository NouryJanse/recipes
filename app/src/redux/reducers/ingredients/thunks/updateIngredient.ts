import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import LogHelper from '../../../../helpers/LogHelper'
import RootState from '../../../../types/RootState'

const updateIngredientAPI = async (
  data: Ingredient,
  token: string,
): Promise<Ingredient | false> => {
  try {
    const requestBody = {
      name: data.name,
      published: data.published,
      calorieCount: data.calorieCount,
    }

    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/ingredients/${data.id}`,
      requestBody,
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

const updateIngredientThunk = createAsyncThunk(
  'ingredients/updateIngredient',
  async (data: Ingredient, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const user = state.userSlice?.data?.user
    return updateIngredientAPI({ ...data }, user.token)
  },
)

export default updateIngredientThunk
