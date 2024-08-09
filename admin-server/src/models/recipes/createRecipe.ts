import { Prisma, PrismaClient, Recipe } from '@prisma/client'
import { ObjectAlreadyExistsError } from '../../types/Error'

const prisma = new PrismaClient()

const createRecipe = async (
    name: string,
    description: string,
    _authorId: number,
    course: string,
): Promise<Recipe> => {
    try {
        return await prisma.recipe.create({
            data: {
                name,
                description,
                course,
                numberOfPersons: 1,
            },
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new ObjectAlreadyExistsError('This recipe already exists')
        }
        throw error
    } finally {
        ;async (): Promise<void> => {
            await prisma.$disconnect()
        }
    }
}

export default createRecipe
