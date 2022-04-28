import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
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

const updateRecipeAPI = async (data: Recipe, token: string) => {
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
        Authorization: 'Bearer ' + token,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const updateRecipeThunk = createAsyncThunk(
  'recipes/updateRecipe',
  async (data: Recipe, state: any) => {
    const user = state.getState()?.userSlice?.data?.user
    const response = await updateRecipeAPI({ ...data, authorId: user.sub }, user.token)
    return response
  },
)

export { updateRecipeThunk }
