import { PrismaClient, Recipe } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { FastifyLoggerInstance } from 'fastify'
import ObjectAlreadyExistsError from '../../types/ObjectAlreadyExistsError'

const prisma = new PrismaClient()

const createRecipe = async (
  logger: FastifyLoggerInstance,
  name: string,
  description: string,
  _authorId: number,
  course: string,
): Promise<Recipe | false> => {
  try {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        course,
      },
    })

    return recipe
  } catch (error) {
    logger.error(error)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new ObjectAlreadyExistsError('This recipe already exists')
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default createRecipe
