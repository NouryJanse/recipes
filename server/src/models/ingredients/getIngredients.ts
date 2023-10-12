import { Ingredient, PrismaClient, Recipe } from '@prisma/client'
import { ERROR_MESSAGES } from '../../constants'
import { formatRecipeImages } from '../../helpers'
import NoContentError from '../../types/NoContentError'

const prisma = new PrismaClient()

const getIngredients = async (): Promise<Ingredient[] | false> => {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })

    if (!ingredients.length) throw new NoContentError(ERROR_MESSAGES.NO_INGREDIENTS_FOUND)
    return ingredients
    // return formatRecipeImages(ingredients)
  } catch (error) {
    console.error(error)
    if (error instanceof NoContentError) {
      throw new NoContentError(error.message)
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default getIngredients
