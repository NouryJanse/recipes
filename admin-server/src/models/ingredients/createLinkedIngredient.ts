import { PrismaClient, RecipeIngredient } from '@prisma/client'

const prisma = new PrismaClient()

const createLinkedIngredientOps = async (
    recipeId: number,
    ingredientId: number,
    unit: string,
    amount: number,
): Promise<RecipeIngredient> => {
    try {
        const ingredient = await prisma.recipeIngredient.create({
            data: {
                recipeId,
                ingredientId,
                unit,
                amount,
            },
        })
        return ingredient
    } catch (error) {
        throw error
    } finally {
        ;async (): Promise<void> => {
            await prisma.$disconnect()
        }
    }
}

export default createLinkedIngredientOps
