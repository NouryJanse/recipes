import { PrismaClient, Recipe, Image } from '@prisma/client'
import { FastifyLoggerInstance } from 'fastify'
import { formatRecipeImages } from '../../helpers'
import { NoContentError } from '../../types/Error'

const prisma = new PrismaClient()

const getRecipes = async (logger: FastifyLoggerInstance): Promise<Recipe[] | false> => {
  try {
    let recipes = await prisma.recipe.findMany({
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

    recipes = []
    if (!recipes.length) throw new NoContentError('No recipes could be found.')

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
