import { Recipe } from '@prisma/client'

const formatRecipeImages = (recipes: Recipe[]): Recipe[] => {
  return recipes.map((recipe): Recipe => {
    // @ts-ignore: weird error because relation typings are not generated by Prisma
    if (recipe.Image && recipe.Image.length) {
      // @ts-ignore: weird error because relation typings are not generated by Prisma
      const newRecipe: Recipe = { ...recipe, images: recipe.Image }
      // @ts-ignore: weird error because relation typings are not generated by Prisma
      delete newRecipe.Image
      return newRecipe
    }
    return recipe
  })
}

export default formatRecipeImages