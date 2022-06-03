import { PrismaClient, Recipe } from '@prisma/client'
import { build } from '../setupTestApplication'

const prisma = new PrismaClient()

/* 
  TODO:
    1. Setup test database (this is not a Docker environment so can not spin up and destroy one)
    2. Create separate Prisma schema (unfortunately no imports of schemas are allowed yet, so duplication is going to be inevitable without any questionable thirdparty tooling)
    3. Setup general beforeAll and afterAll for db prep (making sure tables are created and truncated afterwards)
    4. Generate tests (refer to the plan below)

    GOAL: is to test the integration of the whole application flow, this includes invoking the route, subsequent execution of the operation, and finally the reliability of the model.
*/

afterEach(async () => {
  await prisma.recipe.deleteMany({})
})

// beforeEach(() => {})
// beforeAll(() => {})
// afterAll(async () => {})

describe('createRecipe', () => {
  const app = build()

  it('creates 1 new recipe and expect it to be in the response', async () => {
    const payload = {
      name: 'my new recipe 1',
      description: 'this snack is so delicous, I want to eat it every day',
      course: 'snack',
      userId: 'auth0|abcdef12345679',
    }

    const response = await app.inject({
      method: 'POST',
      url: '/api/recipes',
      payload,
    })

    const recipes = JSON.parse(response.payload).recipes

    expect(response.statusCode).toBe(201)
    expect(response.statusMessage).toBe('Created')
    expect(Array.isArray(recipes)).toBeTruthy()
    expect(recipes.length > 0).toBeTruthy()
    expect(recipes.some((recipe: Recipe) => recipe.name === 'my new recipe 1')).toBeTruthy()
    // TODO: check if recipe is in response (via find)
  })

  it('fails when creating a duplicate recipe', async () => {
    // test plan: create the same recipe twice and expect an error
    // expect: HTTP 500
    // expect: empty response object (no JSON)

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

    const response2 = await app.inject({
      method: 'POST',
      url: '/api/recipes',
      payload,
    })

    const response = JSON.parse(response2.payload)

    expect(response2.statusCode).toBe(500)
    expect(response.message === 'This recipe already exists').toBeTruthy()
    // expect(recipes.length > 0).toBeTruthy()
    // expect(recipes.some((recipe: Recipe) => recipe.name === 'my new recipe 1')).toBeTruthy()
  })
})
