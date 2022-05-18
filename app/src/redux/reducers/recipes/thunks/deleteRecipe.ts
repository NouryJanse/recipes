import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import RootState from '../../../../types/RootState'

async function deleteRecipeAPI(data: Recipe, token: string): Promise<Recipe> {
  const response = await axios.delete(`http://localhost:1337/api/recipes/${data.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name: data.name,
      description: data.description,
      authorId: data.authorId,
    },
  })
  return response.data
}

const deleteRecipeThunk = createAsyncThunk('recipes/deleteRecipe', async (id: number, thunkApi) => {
  const state = thunkApi.getState() as RootState
  const user = state.userSlice?.data?.user
  const response = await deleteRecipeAPI({ id, authorId: user.sub }, user.token)
  return response
})

export default deleteRecipeThunk
