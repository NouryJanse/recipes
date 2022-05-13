import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const createRecipeImageAPI = async (data: CloudinaryImage, recipeId: number, token: string) => {
  try {
    const response = await axios.post(`http://localhost:1337/api/recipes/image/${recipeId}`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const createRecipeImageThunk = createAsyncThunk(
  'recipes/createRecipeImage',
  async (data: any, state: any) => {
    const user = state.getState()?.userSlice?.data?.user
    const image: CloudinaryImage = data
    return await createRecipeImageAPI(image, data.recipeId, user.token)
  },
)

export { createRecipeImageThunk }
