import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Recipe from '../../../../types/Recipe'

async function createRecipeAPI(recipe: Recipe, token: string) {
  console.log(recipe)
  const response = await axios.post(
    'http://localhost:1337/api/recipes',
    {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      course: recipe.course,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  )
  return response.data
}

export const createRecipeThunk = createAsyncThunk(
  'recipes/createRecipe',
  async (data: Recipe, state: any) => {
    const user = state.getState()?.userSlice?.data?.user
    const response = await createRecipeAPI({ ...data, id: user.sub }, user.token)
    return response
  },
)
