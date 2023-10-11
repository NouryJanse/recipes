import { Ingredient, PrismaClient, RecipeIngredients } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'
const prisma = new PrismaClient()

const updateIngredient = async (
  recipeIngredient: RecipeIngredients,
): Promise<RecipeIngredients | false> => {
  console.log(recipeIngredient)

  try {
    const ingredient = await prisma.recipeIngredients.update({
      where: {
        id: recipeIngredient.id,
      },
      data: {
        ...(recipeIngredient.ingredientId && { ingredientId: recipeIngredient.ingredientId }),
        ...(recipeIngredient.unit && { unit: recipeIngredient.unit }),
        ...(recipeIngredient.amount && { amount: recipeIngredient.amount }),
        ...(recipeIngredient.description && { description: recipeIngredient.description }),
      },
    })

    return ingredient
  } catch (error) {
    // logger.error(error)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ObjectCouldNotBeFoundError(
        `The ingredient with id: ${recipeIngredient.id} could not be found`,
      )
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default updateIngredient
