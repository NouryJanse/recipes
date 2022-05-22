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

describe('createRecipe', () => {
  const app = build()

  it('creates 1 new recipe ', async () => {
    // test plan: create a recipe, and delete it after
    // expect: HTTP 201 status code
    // expect: a reponse with all recipes including the latest creation
    //
    // const payload = {
    //   name: 'my new recipe',
    //   description: 'this snack is so delicous, I want to eat it every day',
    //   course: 'snack',
    //   userId: 'auth0|abcdef12345679',
    // }
    // const response = await app.inject({
    //   method: 'POST',
    //   url: '/api/recipes',
    //   payload,
    // })
    // console.log(response.statusCode)
    // console.log(response.statusMessage)
    // console.log(response.payload)
    // console.log(response.body)
    // console.log(JSON.parse(response.payload))
  })

  it('fails when creating a duplicate recipe', async () => {
    // test plan: create the same recipe twice and expect an error
    // expect: HTTP 500
    // expect: empty response object (no JSON)
  })
})
