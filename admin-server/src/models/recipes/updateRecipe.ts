import { Prisma, PrismaClient, Recipe } from '@prisma/client'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const prisma = new PrismaClient()

const updateRecipe = (
  id: number,
  name: string,
  description: string,
  _authorId: number,
  course: string,
  published: boolean,
  numberOfPersons: number,
): Promise<Recipe | false> => {
  console.log(numberOfPersons)

  try {
    return prisma.recipe.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        course,
        published,
        numberOfPersons,
      },
    })
  } catch (error) {
    console.error(error)
    // LOG ERROR
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ObjectCouldNotBeFoundError(`The recipe with id: ${id} could not be found`)
    }
    throw error
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default updateRecipe
