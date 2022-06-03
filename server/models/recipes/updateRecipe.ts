import { PrismaClient, Recipe, Image } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { FastifyLoggerInstance } from 'fastify'
import { ObjectCouldNotBeFoundError } from '../../types/Error'

const prisma = new PrismaClient()

const updateRecipe = async (
  logger: FastifyLoggerInstance,
  id: number,
  name: string,
  description: string,
  _authorId: number,
  course: string,
): Promise<Recipe | false> => {
  try {
    const recipe = await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        course,
      },
    })

    return recipe
  } catch (error) {
    logger.error(error)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ObjectCouldNotBeFoundError(`The recipe with id: ${id} could not be found`)
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default updateRecipe
