import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Image } from '../../../../types/Image'

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
  async (data: any, state: any) => {
    const user = state.getState()?.userSlice?.data?.user
    const image: CloudinaryImage = data
    return createRecipeImageAPI(image, data.recipeId, user.token)
  },
)

export default createRecipeImageThunk
