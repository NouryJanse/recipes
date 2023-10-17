import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import RootState from '../../../../types/RootState'

const deleteRecipeImageAPI = async (cloudinaryPublicId: string, token: string): Promise<Image> => {
  const response = await axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/api/recipes/image`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      cloudinaryPublicId,
    },
  })
  return response.data
}

const deleteRecipeImageThunk = createAsyncThunk(
  'recipes/deleteRecipeImage',
  async (cloudinaryPublicId: string, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const user = state.userSlice?.data?.user
    return deleteRecipeImageAPI(cloudinaryPublicId, user.token)
  },
)

export default deleteRecipeImageThunk
