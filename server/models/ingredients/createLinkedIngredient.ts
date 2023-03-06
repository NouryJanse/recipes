import { Ingredient, PrismaClient, RecipeIngredients } from '@prisma/client'
import { FastifyLoggerInstance } from 'fastify'

const prisma = new PrismaClient()

const createLinkedIngredientOps = async (
  logger: FastifyLoggerInstance,
  recipeId: number,
  ingredientId: number,
  unit: string,
  amount: number,
): Promise<RecipeIngredients | false> => {
  try {
    const ingredient = await prisma.recipeIngredients.create({
      data: {
        recipeId,
        ingredientId,
        unit,
        amount,
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

export default createLinkedIngredientOps
