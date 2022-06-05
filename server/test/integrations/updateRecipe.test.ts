import { PrismaClient, Recipe, Image } from '@prisma/client'
import { build } from '../setupTestApplication'
import recipeInputPayload from './mocks/recipeInputPayload.mock'

const prisma = new PrismaClient()

interface RecipeWithImage extends Recipe {
  id: number
  images?: Image[]
  createdAt: Date
  updatedAt: Date
}

afterEach(async () => {
  await prisma.recipe.deleteMany({})
})

// beforeEach(() => {})
// beforeAll(() => {})
// afterAll(async () => {})

afterEach(async () => {
  await prisma.recipe.deleteMany({})
})

const createOne = async (): Promise<Recipe> => {
  return prisma.recipe.create({
    data: {
      name: recipeInputPayload.name,
      description: recipeInputPayload.description,
      course: recipeInputPayload.course,
    },
  })
}

describe('updateRecipe', () => {
  const app = build()

  it('updates an existing recipe', async (): Promise<void> => {
    const prismaRecipe = await createOne()

    // these props are added manually by Prisma
    if (!prismaRecipe.createdAt || !prismaRecipe.updatedAt) {
      return
    }

    const updatePayload: RecipeWithImage = {
      id: prismaRecipe.id,
      name: 'This is my updated recipe',
      description: 'It is so delicious',
      course: 'dinner',
      createdAt: prismaRecipe.createdAt,
      updatedAt: prismaRecipe.updatedAt,
      authorId: prismaRecipe.authorId,
      published: prismaRecipe.published,
      rating: prismaRecipe.rating,
      difficultyRating: prismaRecipe.difficultyRating,
      calorieCount: prismaRecipe.calorieCount,
      cookingDuration: prismaRecipe.cookingDuration,
      images: [],
    }

    const response = await app.inject({
      method: 'PUT',
      url: `/api/recipes/${prismaRecipe.id}`,
      payload: updatePayload,
    })

    const responsePayload = JSON.parse(response.payload)

    // test if properties exist at first before loading them over to the payload
    expect(responsePayload).toHaveProperty('createdAt')
    expect(responsePayload).toHaveProperty('updatedAt')
    if (prismaRecipe.createdAt && prismaRecipe.updatedAt) {
      updatePayload.createdAt = responsePayload.createdAt.toString()
      updatePayload.updatedAt = responsePayload.updatedAt.toString()
    }

    // check if all properties match exactly to the test fails when new
    expect(response.statusCode).toBe(201)
    expect(responsePayload).toMatchObject(updatePayload)
  })
})
