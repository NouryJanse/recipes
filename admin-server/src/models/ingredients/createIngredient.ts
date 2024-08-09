import { Ingredient, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createIngredient = async (
    name: string,
    unit: string,
    calorieCount?: number,
    published?: boolean,
): Promise<Ingredient> => {
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
        throw error
    } finally {
        ;async (): Promise<void> => {
            await prisma.$disconnect()
        }
    }
}

export default createIngredient
