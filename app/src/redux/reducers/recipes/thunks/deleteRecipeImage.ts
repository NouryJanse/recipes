import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import RootState from '../../../../types/RootState'

const deleteRecipeImageAPI = async (imageId: number, token: string): Promise<Image> => {
  const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/recipes/image`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      imageId,
    },
  })
  return response.data
}

const deleteRecipeImageThunk = createAsyncThunk(
  'recipes/deleteRecipeImage',
  async (imageId: number, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const user = state.userSlice?.data?.user
    return deleteRecipeImageAPI(imageId, user.token)
  },
)

export default deleteRecipeImageThunk
