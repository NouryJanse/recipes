import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Recipe {
  id: number
  name: string
  description: string
  authorId: string
  course: string
}

async function updateRecipeAPI(data: Recipe, token: string) {
  const response = await axios.put(
    `http://localhost:1337/api/recipes/${data.id}`,
    {
      name: data.name,
      description: data.description,
      authorId: data.authorId,
      course: data.course,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  )
  return response.data
}

export const updateRecipeThunk = createAsyncThunk(
  'recipes/updateRecipe',
  async (data: Recipe, state: any) => {
    const user = state.getState()?.userSlice?.data?.user
    const response = await updateRecipeAPI({ ...data, authorId: user.sub }, user.token)
    return response
  },
)
