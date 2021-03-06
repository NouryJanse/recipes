import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import RootState from '../../../../types/RootState'

async function createRecipeAPI(recipe: Recipe, token: string): Promise<Recipe> {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/recipes`,
    {
      name: recipe.name,
      description: recipe.description,
      course: recipe.course,
      userId: recipe.authorId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

const createRecipeThunk = createAsyncThunk(
  'recipes/createRecipe',
  async (data: Recipe, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const user: User = state.userSlice?.data?.user
    const response = await createRecipeAPI({ ...data, authorId: user.sub }, user.token)
    return response
  },
)

export default createRecipeThunk
