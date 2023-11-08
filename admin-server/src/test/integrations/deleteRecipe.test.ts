// import { build } from '../setupTestApplication'
// import { createOne, deleteMany, findOne } from './helpers'

// afterEach(async () => {
//   deleteMany()
// })

// const app = build()

// describe('deleteRecipe', (): void => {
//   it('deletes a recipe', async (): Promise<void> => {
//     const recipe = await createOne()

//     if (!recipe) return

//     // delete recipe - this is the tested route
//     const response = await app.inject({
//       method: 'DELETE',
//       url: `/api/recipes/${recipe.id}`,
//     })

//     const parsedResponse = JSON.parse(response.payload)
//     const res = await findOne(recipe.id)

//     expect(parsedResponse).toMatchObject({})
//     expect(response.statusCode).toBe(200)
//     expect(res).toBe(null)
//   })
// })
