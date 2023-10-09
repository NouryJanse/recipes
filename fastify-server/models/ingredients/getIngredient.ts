import { Ingredient, PrismaClient, Recipe } from '@prisma/client'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import { FastifyLoggerInstance } from 'fastify'
import { ERROR_MESSAGES } from '../../constants'
import CustomError from '../../types/CustomError'
import IdIsOfInvalidFormat from '../../types/IdIsOfInvalidFormat'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const prisma = new PrismaClient()

const getIngredient = async (
  logger: FastifyLoggerInstance,
  ingredientId: number,
): Promise<Ingredient> => {
  try {
    const recipe = await prisma.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
      // include: {
      //   Image: {
      //     orderBy: {
      //       position: 'asc',
      //     },
      //   },
      // },
    })

    if (recipe === null) throw new CustomError(ERROR_MESSAGES.NOT_FOUND)
    return recipe
  } catch (error) {
    logger.error(error)
    if (error instanceof PrismaClientValidationError) {
      throw new IdIsOfInvalidFormat(ERROR_MESSAGES.INVALID_ID_FORMAT)
    }
    if (error instanceof CustomError) {
      throw new ObjectCouldNotBeFoundError(
        `The ingredient with id: ${ingredientId} could not be found`,
      )
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default getIngredient