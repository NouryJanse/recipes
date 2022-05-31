import { Image, Recipe } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import NodeCache from 'node-cache'
import { HTTP_CODES } from '../../constants'
import { formatRecipeImages } from '../../helpers'

import { createImage, deleteImage, updateImage } from '../../models/images'

import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from '../../models/recipes'

// let cache: NodeCache
// if (process.env.ENV !== 'test') {
//   cache = new NodeCache({ stdTTL: 15 })
// } else {
//   cache = new NodeCache({ stdTTL: 0 })
// }

const createRecipeOps = async (
  request: FastifyRequest<{ Body: FastifyRecipeBody }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    const recipe = await createRecipe(
      request.log,
      request.body.name,
      request.body.description,
      request.body.authorId,
      request.body.course,
    )

    if (!recipe) throw new Error('An error occurred')

    const recipes = await getRecipes(request.log)

    // cache.del('recipes')
    return reply.code(HTTP_CODES.CREATED).send({ recipes })
  } catch (error) {
    request.log.error(error)
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

const getRecipesOps = async (
  request: FastifyRequest<{ Body: FastifyRecipeBody }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  // improve the cache by implementing an id system so that individual recipes can be invalidated
  // if (cache.has('recipes')) {
  //   return reply.code(HTTP_CODES.OK).send(cache.get('recipes'))
  // }

  console.log(process.env.ENV)

  const recipes = await getRecipes(request.log)
  // cache.set('recipes', recipes)

  return reply.code(HTTP_CODES.OK).send(recipes)
}

const getRecipeOps = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  const recipe: Recipe | null | false = await getRecipe(request.log, Number(request.params.id))
  if (recipe) {
    return reply.code(HTTP_CODES.OK).send(formatRecipeImages([recipe])[0])
  }

  return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
}

const updateRecipeOps = async (
  request: FastifyRequest<{ Body: FastifyRecipeBody; Params: FastifyRecipeParams }>,
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

  if (request.body.images && request.body.images.length) {
    const promises = request.body.images.map(async (image) => {
      return updateImage(request.log, image)
    })
    await Promise.all(promises)
      .then((response) => {
        return response
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // cache.del('recipes')

  if (recipe && recipe.id) {
    const recipeWithImage = await getRecipe(request.log, Number(recipe.id))
    if (recipeWithImage) {
      return reply.code(HTTP_CODES.CREATED).send(formatRecipeImages([recipeWithImage])[0])
    }
  }
  request.log.info('Not found')
  return reply.code(HTTP_CODES.NOT_FOUND).send({})
}

const createRecipeImageOps = async (
  request: FastifyRequest<{ Body: any; Params: FastifyRecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  const recipeId = +request.params.id
  if (request.body.image.data) {
    const image: Image | false = await createImage(request.log, request.body.image.data, recipeId)
    if (image) {
      return reply.code(HTTP_CODES.CREATED).send(image)
    }
  }

  request.log.error('An error occurred')
  return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
}

const deleteRecipeImageOps = async (
  request: FastifyRequest<{ Body: { cloudinaryPublicId: string }; Params: FastifyRecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    // improve the cache by deleting the recipe instance of that relates to this image - instead of all recipes
    // cache.del('recipes')
    const { cloudinaryPublicId } = request.body
    await deleteImage(request.log, cloudinaryPublicId)

    return reply.code(HTTP_CODES.OK).send({})
  } catch (error) {
    request.log.error('An error occurred')
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

const deleteRecipeOps = async (
  request: FastifyRequest<{ Body: FastifyRecipeBody; Params: FastifyRecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    await deleteRecipe(request.log, Number(request.params.id))

    const recipes = await getRecipes(request.log)

    // cache.del('recipes')
    return reply.code(HTTP_CODES.CREATED).send({ recipes })
  } catch (error) {
    request.log.error(error)
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
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
