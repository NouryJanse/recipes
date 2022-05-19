import { Image } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import NodeCache from 'node-cache'
import { formatRecipeImages } from './helpers'
import {
  createRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
  saveImage,
  deleteImage,
  getRecipe,
} from './model'

const cache = new NodeCache({ stdTTL: 15 })

const createRecipeOps = async (
  request: FastifyRequest<{ Body: RecipeBody }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    // const user = request.user
    const recipe = await createRecipe(
      request.log,
      request.body.name,
      request.body.description,
      request.body.authorId,
      request.body.course,
    )

    if (!recipe) throw new Error('An error occurred')

    const recipes = await getRecipes(request.log)

    cache.del('recipes')
    return reply.code(201).send({ recipes })
  } catch (error) {
    request.log.error(error)
    return reply.code(500).send({})
  }
}

const getRecipesOps = async (
  request: FastifyRequest<{ Body: RecipeBody }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  if (cache.has('recipes')) {
    return reply.code(200).send(cache.get('recipes'))
  }

  const recipes = await getRecipes(request.log)

  cache.set('recipes', recipes)
  return reply.code(200).send(recipes)
}

const getRecipeOps = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  const recipes = await getRecipe(request.log, Number(request.params.id))
  return reply.code(200).send(recipes)
}

const updateRecipeOps = async (
  request: FastifyRequest<{ Body: RecipeBody; Params: RecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  const recipe = await updateRecipe(
    request.log,
    Number(request.params.id),
    request.body.name,
    request.body.description,
    request.body.authorId,
    request.body.course,
  )

  cache.del('recipes')

  if (recipe && recipe.id) {
    let recipeWithImage = await getRecipe(request.log, Number(recipe.id))
    if (recipeWithImage) {
      return reply.code(201).send(formatRecipeImages([recipeWithImage])[0])
    }
  }
  return reply.code(201).send()
}

const createRecipeImageOps = async (
  request: FastifyRequest<{ Body: CloudinaryImage; Params: RecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  const recipeId = +request.params.id

  if (request?.body?.asset_id) {
    const image: Image | false = await saveImage(request.log, request.body, recipeId)
    if (image) {
      return reply.code(201).send(image)
    }
  }
  request.log.error('An error occurred')
  return reply.code(500).send()
}

const deleteRecipeImageOps = async (
  request: FastifyRequest<{ Body: { imageId: number }; Params: RecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    const imageId = request.body.imageId
    await deleteImage(request.log, imageId)
    return reply.code(200).send()
  } catch (error) {
    request.log.error('An error occurred')
    return reply.code(500).send()
  }
}

const deleteRecipeOps = async (
  request: FastifyRequest<{ Body: RecipeBody; Params: RecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    await deleteRecipe(request.log, Number(request.params.id))

    const recipes = await getRecipes(request.log)

    cache.del('recipes')
    return reply.code(201).send({ recipes })
  } catch (error) {
    request.log.error(error)
    return reply.code(500).send({})
  }
}

export default {
  createRecipeOps,
  getRecipesOps,
  getRecipeOps,
  updateRecipeOps,
  createRecipeImageOps,
  deleteRecipeImageOps,
  deleteRecipeOps,
}
