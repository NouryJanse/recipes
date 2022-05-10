import { FastifyRequest, FastifyReply } from 'fastify'
import NodeCache from 'node-cache'
import { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe, saveImage } from './model'
import { Image } from '@prisma/client'

const cache = new NodeCache({ stdTTL: 15 })

const createRecipeOps = async (request: any, reply: FastifyReply): Promise<FastifyReply> => {
  const user = request.user
  const recipe = await createRecipe(
    request.body.name,
    request.body.description,
    request.body.authorId,
    request.body.course,
  )
  const recipes = await getRecipes()
  cache.del('recipes')
  return reply.code(201).send({ recipes })
}

const getRecipesOps = async (_request: FastifyRequest, reply: FastifyReply) => {
  if (cache.has('recipes')) {
    return cache.get('recipes')
  }
  const recipes = await getRecipes()
  cache.set('recipes', recipes)
  return reply.code(200).send({ recipes })
}

const getRecipeOps = async (_request: any, reply: FastifyReply) => {
  return reply.code(201).send({ title: 'frieten' })
}

const updateRecipeOps = async (request: any, reply: FastifyReply): Promise<FastifyReply> => {
  if (request?.body?.images?.length > 0) {
    const promises = request.body.images.map((image: Image) => {
      image.recipeId = +request.params.id
      return saveImage(image)
    })
    Promise.all(promises).then((result) => {
      return result
    })
  }

  const recipe = await updateRecipe(
    Number.parseInt(request.params.id),
    request.body.name,
    request.body.description,
    request.body.authorId,
    request.body.course,
  )
  cache.del('recipes')
  if (recipe && recipe.id) {
    return reply.code(201).send(recipe)
  }
  return reply.code(201).send()
}

const deleteRecipeOps = async (request: any, reply: FastifyReply) => {
  const res = await deleteRecipe(Number.parseInt(request.params.id))
  const recipes = await getRecipes()
  cache.del('recipes')
  return reply.code(201).send({ recipes })
}

export default {
  createRecipeOps,
  getRecipesOps,
  getRecipeOps,
  updateRecipeOps,
  deleteRecipeOps,
}
