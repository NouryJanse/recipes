import { PrismaClient, Ingredient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ObjectCouldNotBeFoundError } from '../../types/Error'

const prisma = new PrismaClient()

const updateIngredient = async (
    id: number,
    name: string,
    unit: string,
    calorieCount: number,
    published: boolean,
): Promise<Ingredient | false> => {
    try {
        return prisma.ingredient.update({
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
    } catch (error) {
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
