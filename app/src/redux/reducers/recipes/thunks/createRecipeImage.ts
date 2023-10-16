import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import RootState from '../../../../types/RootState'

interface FormDataWithImage extends ImageData {
  recipeId: number
}

const createRecipeImageAPI = async (data: FormDataWithImage, recipeId: number, token: string): Promise<Image> => {
  const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/recipes/image/${recipeId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const createRecipeImageThunk = createAsyncThunk(
  'recipes/createRecipeImage',
  async (data: FormDataWithImage, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const user = state.userSlice?.data?.user
    return createRecipeImageAPI(data, data.recipeId, user.token)
  },
)

export default createRecipeImageThunk
