import { build } from '../setupTestApplication'

/* 
  TODO:
    1. Setup test database (this is not a Docker environment so can not spin up and destroy one)
    2. Create separate Prisma schema (unfortunately no imports of schemas are allowed yet, so duplication is going to be inevitable without any questionable thirdparty tooling)
    3. Setup general beforeAll and afterAll for db prep (making sure tables are created and truncated afterwards)
    4. Generate tests (refer to the plan below)

    GOAL: is to test the integration of the whole application flow, this includes invoking the route, subsequent execution of the operation, and finally the reliability of the model.
*/

beforeEach(() => {})
afterEach(() => {})

beforeAll(() => {
  // seed the recipes table
})

afterAll(() => {
  // truncate the recipes table
})

describe('getRecipes', () => {
  const app = build()

  it('returns all recipes', async () => {})

  it('returns a decorated error response when there are no recipes', async () => {})
})
