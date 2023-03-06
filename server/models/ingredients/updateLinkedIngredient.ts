import { PrismaClient, Ingredient, RecipeIngredients } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { FastifyLoggerInstance } from 'fastify'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const prisma = new PrismaClient()

const updateIngredient = async (
  logger: FastifyLoggerInstance,
  body: any,
): Promise<RecipeIngredients | false> => {
  try {
    const ingredient = await prisma.recipeIngredients.update({
      where: {
        id: body.id,
      },
      data: {
        ...(body.unit && { unit: body.unit }),
        ...(body.amount && { amount: body.amount }),
      },
    })

    return ingredient
  } catch (error) {
    logger.error(error)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ObjectCouldNotBeFoundError(`The ingredient with id: ${body.id} could not be found`)
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default updateIngredient
