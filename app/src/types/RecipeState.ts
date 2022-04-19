import Recipe from './Recipe'

export default interface RecipeState {
  data: { recipes: Recipe[] }
  status: {
    getRecipe?: string
    getRecipes?: string
    createRecipe?: string
    updateRecipe?: string
    deleteRecipe?: string
  }
  error?: {}
}
