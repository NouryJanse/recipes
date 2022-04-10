import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Recipe } from '../../../../types/Recipe'

async function deleteRecipeAPI(data: Recipe, token: string) {
  const response = await axios.delete(`http://localhost:1337/api/recipes/${data.id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: {
      name: data.name,
      description: data.description,
      authorId: data.authorId,
    },
  })
  return response.data
}

export const deleteRecipeThunk = createAsyncThunk(
  'recipes/deleteRecipe',
  async (id: number, state: any) => {
    const user = state.getState()?.userSlice?.data?.user
    const response = await deleteRecipeAPI({ id, authorId: user.sub }, user.token)
    return response
  },
)
