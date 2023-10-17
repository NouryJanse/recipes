export default interface IngredientState {
  data: { ingredients: Ingredient[] }
  status: {
    createIngredient?: string
    deleteIngredient?: string
    getIngredient?: string
    getIngredients?: string
    updateIngredient?: string
  }
  error?: object
}
