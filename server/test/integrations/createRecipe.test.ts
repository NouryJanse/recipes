import { PrismaClient, Recipe } from '@prisma/client'
import { build } from '../setupTestApplication'
import recipeInputPayload from './mocks/recipeInputPayload.mock'

const prisma = new PrismaClient()

afterEach(async () => {
  await prisma.recipe.deleteMany({})
})

// beforeEach(() => {})
// beforeAll(() => {})
// afterAll(async () => {})

describe('createRecipe', () => {
  const app = build()

  it('creates 1 new recipe and expect it to be in the response', async (): Promise<void> => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/recipes',
      payload: recipeInputPayload,
    })

    const { recipes } = JSON.parse(response.payload)

    expect(response.statusCode).toBe(201)
    expect(response.statusMessage).toBe('Created')
    expect(Array.isArray(recipes)).toBeTruthy()
    expect(recipes.length > 0).toBeTruthy()
    expect(recipes.some((recipe: Recipe) => recipe.name === 'my new recipe 1')).toBeTruthy()
  })

  it('fails when creating a duplicate recipe', async (): Promise<void> => {
    const payload = {
      name: 'my new recipe 1',
      description: 'this snack is so delicous, I want to eat it every day',
      course: 'snack',
      userId: 'auth0|abcdef12345679',
    }

    await app.inject({
      method: 'POST',
      url: '/api/recipes',
      payload,
    })

    const response = await app.inject({
      method: 'POST',
      url: '/api/recipes',
      payload,
    })

    const responsePayload = JSON.parse(response.payload)

    expect(response.statusCode).toBe(500)
    expect(responsePayload.message === 'This recipe already exists').toBeTruthy()
  })
})
