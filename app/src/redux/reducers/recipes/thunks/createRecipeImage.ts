import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import RootState from '../../../../types/RootState'

const createRecipeImageAPI = async (data: any, recipeId: number, token: string): Promise<Image> => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/recipes/image/${recipeId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

const createRecipeImageThunk = createAsyncThunk(
  'recipes/createRecipeImage',
  async (data: any, thunkApi) => {
    // data.recipeId
    // data.image.name
    // data.image.size
    // data.image.type
    // data.image.data

    const state = thunkApi.getState() as RootState
    const user = state.userSlice?.data?.user
    // const image: CloudinaryImage = data
    return createRecipeImageAPI(data, data.recipeId, user.token)
  },
)

export default createRecipeImageThunk
