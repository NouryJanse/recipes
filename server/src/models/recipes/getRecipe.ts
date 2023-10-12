import { PrismaClient, Recipe, RecipeIngredient } from '@prisma/client'
import { ERROR_MESSAGES } from '../../constants'
import CustomError from '../../types/CustomError'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const prisma = new PrismaClient()

const getRecipe = async (recipeId: number): Promise<Recipe> => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        Image: {
          orderBy: {
            position: 'asc',
          },
        },
        RecipeIngredient: {
          include: {
            ingredient: true,
          },
          orderBy: {
            addedAt: 'desc',
          },
        },
      },
    })

    if (recipe === null) throw new CustomError(ERROR_MESSAGES.NOT_FOUND)
    return recipe
  } catch (error) {
    // LOG ERROR
    if (error instanceof CustomError) {
      throw new ObjectCouldNotBeFoundError(`The recipe with id: ${recipeId} could not be found`)
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default getRecipe
