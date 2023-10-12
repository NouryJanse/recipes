import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const deleteLinkedIngredient = async (id: number): Promise<boolean> => {
  if (!id) return false

  try {
    await prisma.recipeIngredient.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default deleteLinkedIngredient
