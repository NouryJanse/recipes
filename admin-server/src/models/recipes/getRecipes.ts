import { PrismaClient, Recipe } from '@prisma/client'
import { ERROR_MESSAGES } from '../../constants'
import { formatRecipeImages } from '../../helpers'
import { NoContentError } from '../../types/Error'

const prisma = new PrismaClient()

const getRecipes = async (filter: string | undefined): Promise<Recipe[]> => {
    try {
        const recipes = await prisma.recipe.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                Image: {
                    orderBy: {
                        position: 'asc',
                    },
                },
                RecipeIngredient: {
                    include: {
                        ingredient: true,
                    },
                    orderBy: {
                        addedAt: 'desc',
                    },
                },
            },
            where: {
                name: { contains: filter, mode: 'insensitive' },
            },
        })

        if (!recipes.length) throw new NoContentError(ERROR_MESSAGES.NO_RECIPES_FOUND)
        return formatRecipeImages(recipes)
    } catch (error) {
        if (error instanceof NoContentError) {
            //
        }
        throw error
    } finally {
        ;async (): Promise<void> => {
            await prisma.$disconnect()
        }
    }
}

export default getRecipes
