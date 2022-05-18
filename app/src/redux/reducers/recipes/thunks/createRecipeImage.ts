import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Image from '../../../../types/Image'
import RootState from '../../../../types/RootState'

const createRecipeImageAPI = async (
  data: CloudinaryImage,
  recipeId: number,
  token: string,
): Promise<Image> => {
  const response = await axios.post(`http://localhost:1337/api/recipes/image/${recipeId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const createRecipeImageThunk = createAsyncThunk(
  'recipes/createRecipeImage',
  async (data: CloudinaryImageWithRecipeId, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const user = state.userSlice?.data?.user
    const image: CloudinaryImage = data
    return createRecipeImageAPI(image, data.recipeId, user.token)
  },
)

export default createRecipeImageThunk
