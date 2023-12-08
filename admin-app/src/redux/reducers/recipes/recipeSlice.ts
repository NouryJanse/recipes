import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  data: { recipes: [] as Recipe[] },
  status: {
    getRecipe: 'initial',
    getRecipes: 'initial',
    createRecipe: 'initial',
    createRecipeImage: 'initial',
    deleteRecipeImage: 'initial',
    updateRecipe: 'initial',
    deleteRecipe: 'initial',
  },
  error: {},
}

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
})

export const {} = recipeSlice.actions

export default recipeSlice.reducer
