import { PrismaClient, Ingredient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const prisma = new PrismaClient()

const updateIngredient = async (
  id: number,
  name: string,
  unit: string,
  calorieCount: number,
  published: boolean,
): Promise<Ingredient | false> => {
  try {
    const ingredient = await prisma.ingredient.update({
      where: {
        id,
      },
      data: {
        name,
        unit,
        calorieCount,
        published,
      },
    })

    return ingredient
  } catch (error) {
    // logger.error(error)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ObjectCouldNotBeFoundError(`The ingredient with id: ${id} could not be found`)
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default updateIngredient
