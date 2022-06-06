import { PrismaClient, Recipe } from '@prisma/client'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import { FastifyLoggerInstance } from 'fastify'
import { CustomError, IdIsOfInvalidFormat, ObjectCouldNotBeFoundError } from '../../types/Error'

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
      },
    })

    if (recipe === null) throw new CustomError('Not found')
    return recipe
  } catch (error) {
    logger.error(error)
    if (error instanceof PrismaClientValidationError) {
      throw new IdIsOfInvalidFormat('This Id format is not valid')
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
