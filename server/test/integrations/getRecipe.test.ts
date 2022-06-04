import { PrismaClient } from '@prisma/client'
import { build } from '../setupTestApplication'

const prisma = new PrismaClient()

afterEach(async () => {
  await prisma.recipe.deleteMany({})
})

// beforeEach(() => {})
// beforeAll(() => {})
// afterAll(async () => {})

describe('getRecipe', () => {
  const app = build()

  it('fetches a single recipe', async () => {})
})
