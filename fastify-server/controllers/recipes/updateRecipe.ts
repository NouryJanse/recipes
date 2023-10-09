import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES, ERROR_MESSAGES } from '../../constants'
import { formatRecipeImages } from '../../helpers'
import { updateImage } from '../../models/images'
import { getRecipe, updateRecipe } from '../../models/recipes'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const updateRecipeOps = async (
  request: FastifyRequest<{ Body: FastifyRecipeBody; Params: FastifyRecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
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
          request.log.error(err)
        })
    }

    const cache = request.serverCache()
    if (cache && cache.has('recipes')) {
      cache.del('recipes')
    }

    if (recipe && recipe.id) {
      const recipeWithImage = await getRecipe(request.log, Number(recipe.id))
      if (recipeWithImage) {
        return reply.code(HTTP_CODES.CREATED).send(formatRecipeImages([recipeWithImage])[0])
      }
    }
    request.log.info('Not found')
    return reply.code(HTTP_CODES.NOT_FOUND).send({})
  } catch (error) {
    request.log.error(error)
    if (error instanceof ObjectCouldNotBeFoundError) {
      return reply.code(HTTP_CODES.UNPROCESSABLE_ENTITY).send({ message: error.message })
    }
    return reply
      .code(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
  }
}

export default updateRecipeOps
