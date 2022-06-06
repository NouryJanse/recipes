import { PrismaClient } from '@prisma/client'
import { build } from '../setupTestApplication'
import { createOne } from './helpers'

const prisma = new PrismaClient()

afterEach(async () => {
  await prisma.recipe.deleteMany({})
})

describe('getRecipe', () => {
  const app = build()

  it('fetches a single recipe with success', async (): Promise<void> => {
    // create recipe
    const createdRecipe = await createOne()

    // these props are added manually by Prisma
    if (!createdRecipe.createdAt || !createdRecipe.updatedAt) {
      return
    }

    // get recipe - this is the tested route
    const response = await app.inject({
      method: 'GET',
      url: `/api/recipes/${createdRecipe.id}`,
    })

    const parsedResponse = JSON.parse(response.payload)

    expect(response.statusCode).toBe(200)

    // test if properties exist at first before loading them over to the payload below
    expect(parsedResponse).toHaveProperty('createdAt')
    expect(parsedResponse).toHaveProperty('updatedAt')

    // check if the object matches
    expect(parsedResponse).toMatchObject({
      ...createdRecipe,
      images: [], // add images because Prisma does not support this
      createdAt: parsedResponse.createdAt,
      updatedAt: parsedResponse.updatedAt,
    })
  })

  it('returns a decorated error response when the id does not exist', async (): Promise<void> => {
    // get recipe - this is the tested route
    const response = await app.inject({
      method: 'GET',
      url: '/api/recipes/12345678910111213',
    })

    expect(response.statusCode).toBe(404)
  })

  it('returns a decorated error response when the id format is invalid', async (): Promise<void> => {
    // get recipe - this is the tested route
    const response = await app.inject({
      method: 'GET',
      url: '/api/recipes/123456789abcef',
    })

    const parsedResponse = JSON.parse(response.payload)

    expect(response.statusCode).toBe(422)
    expect(parsedResponse.message).toBe('This Id format is not valid')
  })
})
