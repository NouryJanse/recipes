import { PrismaClient, Recipe } from '@prisma/client'
import recipeInputPayload from './mocks/recipeInputPayload.mock'

const prisma = new PrismaClient()

const createOne = async (): Promise<Recipe> => {
  return prisma.recipe.create({
    data: {
      name: recipeInputPayload.name,
      description: recipeInputPayload.description,
      course: recipeInputPayload.course,
    },
  })
}

const deleteMany = async () => {
  await prisma.recipe.deleteMany({})
}

const findOne = async (recipeId: number): Promise<Recipe | null> => {
  return prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
    include: {
      Image: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  })
}

const createMany = async () => {
  return prisma.recipe.createMany({
    data: [
      {
        name: 'recipe for getRecipesTest 2',
        description: 'this snack is so delicous, I want to eat it every day',
        course: 'snack',
      },
      {
        name: 'recipe for getRecipesTest 3',
        description: 'this snack is so delicous, I want to eat it every day 2',
        course: 'snack',
      },
    ],
  })
}

export { createOne, deleteMany, findOne, createMany }
