import { PrismaClient, Recipe } from '@prisma/client'
import { ERROR_MESSAGES } from '../../constants'
import { formatRecipeImages } from '../../helpers'
import NoContentError from '../../types/NoContentError'

const prisma = new PrismaClient()

const getRecipes = async (): Promise<Recipe[] | false> => {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: 'desc',
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

    if (!recipes.length) throw new NoContentError(ERROR_MESSAGES.NO_RECIPES_FOUND)
    return formatRecipeImages(recipes)
  } catch (error) {
    // LOG ERROR
    if (error instanceof NoContentError) {
      console.error(error)
      // throw new NoContentError(error.message)
      return []
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default getRecipes
