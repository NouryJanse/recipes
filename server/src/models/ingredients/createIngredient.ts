import { Ingredient, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createIngredient = async (
  name: string,
  unit: string,
  calorieCount?: number,
  published?: boolean,
): Promise<Ingredient | false> => {
  try {
    return prisma.ingredient.create({
      data: {
        name,
        unit,
        ...(calorieCount && { calorieCount }),
        ...(published && { published }),
      },
    })
  } catch (error) {
    console.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default createIngredient
