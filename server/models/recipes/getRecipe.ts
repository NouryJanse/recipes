import { PrismaClient, Recipe } from '@prisma/client'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import { FastifyLoggerInstance } from 'fastify'
import { ERROR_MESSAGES } from '../../constants'
import CustomError from '../../types/CustomError'
import IdIsOfInvalidFormat from '../../types/IdIsOfInvalidFormat'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const prisma = new PrismaClient()

const getRecipe = async (logger: FastifyLoggerInstance, recipeId: number): Promise<Recipe> => {
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
        RecipeIngredients: {
          include: {
            ingredient: {},
          },
          orderBy: {
            amount: 'desc',
          },
        },
      },
    })

    if (recipe === null) throw new CustomError(ERROR_MESSAGES.NOT_FOUND)
    return recipe
  } catch (error) {
    logger.error(error)
    if (error instanceof PrismaClientValidationError) {
      throw new IdIsOfInvalidFormat(ERROR_MESSAGES.INVALID_ID_FORMAT)
    }
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
