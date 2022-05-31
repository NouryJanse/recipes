import { PrismaClient, Recipe } from '@prisma/client'
import { build } from '../setupTestApplication'

const app = build()

const prisma = new PrismaClient()

/* 
  TODO:
    1. Setup test database (this is not a Docker environment so can not spin up and destroy one)
    2. Create separate Prisma schema (unfortunately no imports of schemas are allowed yet, so duplication is going to be inevitable without any questionable thirdparty tooling)
    3. Setup general beforeAll and afterAll for db prep (making sure tables are created and truncated afterwards)
    4. Generate tests (refer to the plan below)

    GOAL: is to test the integration of the whole application flow, this includes invoking the route, subsequent execution of the operation, and finally the reliability of the model.
*/

const createMany = async () => {
  return await prisma.recipe.createMany({
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

// beforeEach(async () => {})
// afterEach(async () => {})
// beforeAll(async () => {})

afterAll(async () => {
  await prisma.recipe.deleteMany({})
})

describe('getRecipes', () => {
  it('returns all recipes', async () => {
    await createMany()

    const response = await app.inject({
      method: 'GET',
      url: '/api/recipes',
    })

    const recipes = JSON.parse(response.payload)
    console.log(recipes.length)

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(Array.isArray(recipes)).toBeTruthy()
    expect(recipes.length > 0).toBeTruthy()
    expect(
      recipes.some((recipe: Recipe) => recipe.name === 'recipe for getRecipesTest 2'),
    ).toBeTruthy()

    await prisma.recipe.deleteMany({})
  })

  it('returns a decorated error response when there are no recipes', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/recipes',
    })
    const recipes = JSON.parse(response.payload)
    console.log(recipes.length)
    console.log(response.statusCode)
    console.log(response.statusMessage)
    expect(recipes.length === 0).toBeTruthy()
  })
})
