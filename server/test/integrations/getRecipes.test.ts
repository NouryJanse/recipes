import { PrismaClient, Recipe } from '@prisma/client'
import { build } from '../setupTestApplication'
import { createMany } from './helpers'

const prisma = new PrismaClient()

afterAll(async () => {
  await prisma.recipe.deleteMany({})
})

describe('getRecipes', () => {
  const app = build()

  it('returns all recipes', async (): Promise<void> => {
    await createMany()

    // get recipes - this is the tested route
    const response = await app.inject({
      method: 'GET',
      url: '/api/recipes',
    })

    const parsedResponse = JSON.parse(response.payload)

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(parsedResponse)).toBeTruthy()
    expect(parsedResponse.length > 0).toBeTruthy()
    expect(
      parsedResponse.some((recipe: Recipe) => recipe.name === 'recipe for getRecipesTest 2'),
    ).toBeTruthy()

    await prisma.recipe.deleteMany({})
  })

  it('returns a decorated error response when there are no recipes', async (): Promise<void> => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/recipes',
    })

    const parsedResponse = JSON.parse(response.payload)

    expect(response.statusCode).toBe(204)
    expect(parsedResponse.message === 'No recipes could be found').toBeTruthy()
  })
})
