import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import LogHelper from '../../../../helpers/LogHelper'
import RootState from '../../../../types/RootState'

const updateRecipeAPI = async (recipe: Recipe, token: string): Promise<Recipe | false> => {
  try {
    const { authorId, id, course, description, name, images, published } = recipe
    const requestBody = {
      name,
      description,
      authorId,
      course,
      published,
      ...(images && images.length > 0 && { images: images }),
    }

    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/recipes/${id}`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    LogHelper({ logType: 'error', message: 'An error occurred' })
    return false
  }
}

const updateRecipeThunk = createAsyncThunk('recipes/updateRecipe', async (data: Recipe, thunkApi) => {
  const state = thunkApi.getState() as RootState
  const user = state.userSlice?.data?.user
  return updateRecipeAPI({ ...data, authorId: user.sub }, user.token)
})

export default updateRecipeThunk
