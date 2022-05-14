import { createSlice } from '@reduxjs/toolkit'
import getRecipeThunk from './thunks/getRecipe'
import getRecipesThunk from './thunks/getRecipes'
import createRecipeThunk from './thunks/createRecipe'
import createRecipeImageThunk from './thunks/createRecipeImage'
import updateRecipeThunk from './thunks/updateRecipe'
import deleteRecipeThunk from './thunks/deleteRecipe'
import RecipeState from '../../../types/RecipeState'
import { REDUX_STATE } from '../../../constants/'

export const initialState = {
  data: { recipes: [] as Recipe[], recipe: {} },
  status: {
    getRecipe: 'initial',
    getRecipes: 'initial',
    createRecipe: 'initial',
    createRecipeImage: 'initial',
    updateRecipe: 'initial',
    deleteRecipe: 'initial',
  },
  error: {},
}

export const getRecipe = getRecipeThunk
export const getRecipes = getRecipesThunk
export const createRecipe = createRecipeThunk
export const createRecipeImage = createRecipeImageThunk
export const updateRecipe = updateRecipeThunk
export const deleteRecipe = deleteRecipeThunk

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state, _action) => {
      state.status.getRecipes = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(getRecipes.rejected, (state, _action) => {
      state.status.getRecipes = REDUX_STATE.REJECTED
      console.error('An error occurred')
      state.error = {}
    })
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      state.status.getRecipes = REDUX_STATE.FULFILLED
      if (action !== null && action.payload) {
        // state.data.recipes = action.payload?.recipes?.length
        //   ? action.payload.recipes
        //   : action.payload
        state.data.recipes = action.payload
      }
      state.error = {}
    })

    builder.addCase(getRecipe.pending, (state, _action) => {
      state.status.getRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(getRecipe.rejected, (state, _action) => {
      state.status.getRecipe = 'rejected'
      console.error('An error occurred')
      state.error = {}
    })
    builder.addCase(getRecipe.fulfilled, (state, action) => {
      state.status.getRecipe = REDUX_STATE.FULFILLED
      if (action !== null && action.payload) {
        const recipe: Recipe = action.payload
        state.data.recipe = recipe
      }
      state.error = {}
    })

    builder.addCase(updateRecipe.pending, (state, _action) => {
      state.status.updateRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(updateRecipe.rejected, (state, _action) => {
      state.status.updateRecipe = REDUX_STATE.REJECTED
      console.error('An error occurred')
      state.error = {}
    })
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const recipes: Recipe[] = state.data.recipes
      if (action?.payload) {
        const updatedRecipe: Recipe = action.payload
        const newRecipes: Recipe[] = recipes.map((recipe: Recipe) => {
          return recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        })
        state.data.recipes = newRecipes
      }
      state.status.updateRecipe = REDUX_STATE.FULFILLED
      state.error = {}
    })

    builder.addCase(createRecipeImage.pending, (state, _action) => {
      state.status.updateRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(createRecipeImage.rejected, (state, _action) => {
      state.status.createRecipeImage = REDUX_STATE.REJECTED
      console.error('An error occurred')
      state.error = {}
    })
    builder.addCase(createRecipeImage.fulfilled, (state, action) => {
      const recipes: Recipe[] = state.data.recipes.map((recipe: Recipe) => {
        if (recipe.id === action.payload.recipeId) {
          return {
            ...recipe,
            images: recipe?.images?.length ? [...recipe.images, action.payload] : [action.payload],
          }
        } else {
          return recipe
        }
      })
      state.data.recipes = recipes
      state.status.createRecipeImage = REDUX_STATE.FULFILLED
      state.error = {}
    })

    builder.addCase(createRecipe.pending, (state, _action) => {
      state.status.createRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(createRecipe.rejected, (state, _action) => {
      state.status.createRecipe = REDUX_STATE.REJECTED
      console.error('An error occurred')
      state.error = {}
    })
    builder.addCase(createRecipe.fulfilled, (state, _action) => {
      state.status.createRecipe = REDUX_STATE.FULFILLED
      state.error = {}
    })

    builder.addCase(deleteRecipe.pending, (state, _action) => {
      state.status.deleteRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(deleteRecipe.rejected, (state, _action) => {
      state.status.deleteRecipe = REDUX_STATE.REJECTED
      console.error('An error occurred')
      state.error = {}
    })
    builder.addCase(deleteRecipe.fulfilled, (state, _action) => {
      state.status.deleteRecipe = REDUX_STATE.FULFILLED
      state.error = {}
    })
  },
})

export const selectRecipes = (state: RecipeState) => state.data.recipes

export default recipeSlice.reducer
