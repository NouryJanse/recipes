import { PrismaClient, Recipe } from '@prisma/client'
import { FastifyLoggerInstance } from 'fastify'
import { ERROR_MESSAGES } from '../../constants'
import { formatRecipeImages } from '../../helpers'
import NoContentError from '../../types/NoContentError'

const prisma = new PrismaClient()

const getRecipes = async (logger: FastifyLoggerInstance): Promise<Recipe[] | false> => {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        Image: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    })

    if (!recipes.length) throw new NoContentError(ERROR_MESSAGES.NO_RECIPES_FOUND)

    return formatRecipeImages(recipes)
  } catch (error) {
    logger.error(error)
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

export default getRecipes
