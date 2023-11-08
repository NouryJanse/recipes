// import { Recipe } from '@prisma/client'
// import { build } from '../setupTestApplication'
// import { deleteMany } from './helpers'
// import recipeInputPayload from './mocks/recipeInputPayload.mock'

// afterEach(async () => {
//   deleteMany()
// })

// describe('createRecipe', () => {
//   const app = build()

//   it('creates 1 new recipe and expect it to be in the response', async (): Promise<void> => {
//     // create recipe - this is the tested route
//     const response = await app.inject({
//       method: 'POST',
//       url: '/api/recipes',
//       payload: recipeInputPayload,
//     })

//     const { recipes } = JSON.parse(response.payload)

//     expect(response.statusCode).toBe(201)
//     expect(response.statusMessage).toBe('Created')
//     expect(Array.isArray(recipes)).toBeTruthy()
//     expect(recipes.length > 0).toBeTruthy()
//     expect(recipes.some((recipe: Recipe) => recipe.name === 'my new recipe 1')).toBeTruthy()
//   })

//   it('fails when creating a duplicate recipe', async (): Promise<void> => {
//     const payload = {
//       ...recipeInputPayload,
//       name: 'my new recipe 1',
//     }

//     // create recipe - this is the tested route
//     await app.inject({
//       method: 'POST',
//       url: '/api/recipes',
//       payload,
//     })

//     const response = await app.inject({
//       method: 'POST',
//       url: '/api/recipes',
//       payload,
//     })

//     const parsedResponse = JSON.parse(response.payload)

//     expect(response.statusCode).toBe(500)
//     expect(parsedResponse.message === 'This recipe already exists').toBeTruthy()
//   })
// })
