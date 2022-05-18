import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import LogHelper from '../../../../helpers/LogHelper'
import RootState from '../../../../types/RootState'

interface Image {
  name: string
  data: string
  src: string
}
interface Recipe {
  id: number
  name: string
  description: string
  authorId: string
  course: string
  images: Image[]
}

const updateRecipeAPI = async (data: Recipe, token: string): Promise<Recipe | false> => {
  try {
    const requestBody = {
      name: data.name,
      description: data.description,
      authorId: data.authorId,
      course: data.course,
      ...(data?.images?.length > 0 && { images: data.images }),
    }

    const response = await axios.put(`http://localhost:1337/api/recipes/${data.id}`, requestBody, {
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

const updateRecipeThunk = createAsyncThunk(
  'recipes/updateRecipe',
  async (data: Recipe, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const user = state.userSlice?.data?.user
    return updateRecipeAPI({ ...data, authorId: user.sub }, user.token)
  },
)

export default updateRecipeThunk
