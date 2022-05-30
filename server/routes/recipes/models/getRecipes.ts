import { PrismaClient, Recipe, Image } from '@prisma/client'
import { FastifyLoggerInstance } from 'fastify'
import { formatRecipeImages } from '../../../helpers'

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

    return formatRecipeImages(recipes)
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default getRecipes
