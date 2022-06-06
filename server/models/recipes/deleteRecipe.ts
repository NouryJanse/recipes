import { PrismaClient } from '@prisma/client'
import { FastifyLoggerInstance } from 'fastify'

const prisma = new PrismaClient()

const deleteRecipe = async (logger: FastifyLoggerInstance, id: number): Promise<boolean> => {
  if (!id) return false

  try {
    await prisma.recipe.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    logger.error(error)
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default deleteRecipe
