import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const deleteIngredient = async (id: number): Promise<boolean> => {
  if (!id) return false

  try {
    await prisma.ingredient.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    // logger.error(error)
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default deleteIngredient
