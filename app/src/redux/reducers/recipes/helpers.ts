// unit test required

const replaceRecipeWithIdInArrayWithRecipes = (
  recipes: Recipe[],
  updatedRecipe: Recipe,
): Recipe[] => {
  return recipes.map((recipe: Recipe) => {
    return recipe.id === updatedRecipe.id ? updatedRecipe : recipe
  })
}

export default replaceRecipeWithIdInArrayWithRecipes
