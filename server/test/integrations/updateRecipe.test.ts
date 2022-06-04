import { PrismaClient } from '@prisma/client'
import { build } from '../setupTestApplication'

const prisma = new PrismaClient()

afterEach(async () => {
  await prisma.recipe.deleteMany({})
})

// beforeEach(() => {})
// beforeAll(() => {})
// afterAll(async () => {})

describe('updateRecipe', () => {
  const app = build()

  it('updates an existing recipe', async () => {})
})
