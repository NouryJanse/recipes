import { Ingredient, PrismaClient } from '@prisma/client'
import { FastifyLoggerInstance } from 'fastify'

const prisma = new PrismaClient()

const createIngredient = async (
  logger: FastifyLoggerInstance,
  name: string,
  unit: string,
  calorieCount: number,
  published: boolean,
): Promise<Ingredient | false> => {
  try {
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        unit,
        calorieCount,
        published,
      },
    })
    return ingredient
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default createIngredient
