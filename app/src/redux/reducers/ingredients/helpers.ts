// unit test required

const replaceIngredientWithIdInArrayWithIngredients = (
  ingredients: Ingredient[],
  updatedIngredient: Ingredient,
): Ingredient[] => {
  return ingredients.map((ingredient: Ingredient) => {
    return ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
  })
}

export default replaceIngredientWithIdInArrayWithIngredients
