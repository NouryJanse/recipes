// import { PrismaClient, Recipe, Image } from '@prisma/client'
// import { build } from '../setupTestApplication'
// import { createOne, deleteMany } from './helpers'
// import recipeInputPayload from './mocks/recipeInputPayload.mock'

// const prisma = new PrismaClient()

// interface RecipeWithImage extends Recipe {
//   id: number
//   images?: Image[]
//   createdAt: Date
//   updatedAt: Date
// }

// afterEach(async () => {
//   await deleteMany()
// })

// afterEach(async () => {
//   await deleteMany()
// })

// describe('updateRecipe', () => {
//   const app = build()

//   it('updates an existing recipe', async (): Promise<void> => {
//     // create recipe
//     const prismaRecipe = await createOne()

//     // these props are added manually by Prisma
//     if (!prismaRecipe.createdAt || !prismaRecipe.updatedAt) {
//       return
//     }

//     const updatePayload: RecipeWithImage = {
//       id: prismaRecipe.id,
//       name: 'This is my updated recipe',
//       description: 'It is so delicious',
//       course: 'dinner',
//       createdAt: prismaRecipe.createdAt,
//       updatedAt: prismaRecipe.updatedAt,
//       authorId: prismaRecipe.authorId,
//       published: prismaRecipe.published,
//       rating: prismaRecipe.rating,
//       difficultyRating: prismaRecipe.difficultyRating,
//       calorieCount: prismaRecipe.calorieCount,
//       cookingDuration: prismaRecipe.cookingDuration,
//       images: [],
//     }

//     // update recipe - this is the tested route
//     const response = await app.inject({
//       method: 'PUT',
//       url: `/api/recipes/${prismaRecipe.id}`,
//       payload: updatePayload,
//     })

//     const parsedResponse = JSON.parse(response.payload)

//     expect(response.statusCode).toBe(201)

//     // test if properties exist at first before loading them over to the payload below
//     expect(parsedResponse).toHaveProperty('createdAt')
//     expect(parsedResponse).toHaveProperty('updatedAt')

//     // check if the object matches
//     expect(parsedResponse).toMatchObject({
//       ...updatePayload,
//       createdAt: parsedResponse.createdAt,
//       updatedAt: parsedResponse.updatedAt,
//     })
//   })
// })
