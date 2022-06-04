import { PrismaClient } from '@prisma/client'
import { build } from '../setupTestApplication'
import recipeInputPayload from './mocks/recipeInputPayload.mock'

const prisma = new PrismaClient()

afterEach(async () => {
  await prisma.recipe.deleteMany({})
})

// beforeEach(() => {})
// beforeAll(() => {})
// afterAll(async () => {})

const createOne = async () => {
  return prisma.recipe.create({
    data: {
      name: recipeInputPayload.name,
      description: recipeInputPayload.description,
      course: recipeInputPayload.course,
    },
  })
}

const findOne = async (recipeId: number) => {
  return await prisma.recipe.findUnique({
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

const app = build()

describe('deleteRecipe', () => {
  it('deletes a recipe', async () => {
    const recipe = await createOne()

    const response = await app.inject({
      method: 'DELETE',
      url: `/api/recipes/${recipe.id}`,
    })

    const responsePayload = JSON.parse(response.payload)
    const res = await findOne(recipe.id)
    expect(responsePayload).toMatchObject({})
    expect(response.statusCode).toBe(200)
    expect(res).toBe(null)
  })
})
