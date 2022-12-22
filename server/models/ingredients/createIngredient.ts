import { Ingredient, PrismaClient } from '@prisma/client'
import { FastifyLoggerInstance } from 'fastify'

const prisma = new PrismaClient()

const createIngredient = async (
  logger: FastifyLoggerInstance,
  name: string,
  calorieCount: number,
  published: boolean,
): Promise<Ingredient | false> => {
  try {
    console.log(name, calorieCount, published)
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
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
