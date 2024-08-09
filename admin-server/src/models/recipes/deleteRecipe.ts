import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const deleteRecipe = async (id: number): Promise<boolean> => {
    if (!id) return false

    try {
        await prisma.recipe.delete({
            where: {
                id,
            },
        })

        return true
    } catch (error) {
        throw error
    } finally {
        ;async (): Promise<void> => {
            await prisma.$disconnect()
        }
    }
}

export default deleteRecipe
