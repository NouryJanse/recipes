export default interface IngredientState {
  data: { ingredients: Ingredient[] }
  status: {
    createIngredient?: string
  }
  error?: object
}
