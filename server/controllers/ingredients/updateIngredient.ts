import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES, ERROR_MESSAGES } from '../../constants'
import { getIngredient, updateIngredient } from '../../models/ingredients'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const updateIngredientOps = async (
  request: FastifyRequest<{ Body: FastifyIngredientBody; Params: FastifyIngredientParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    console.log(request.body)
    const recipe = await updateIngredient(
      request.log,
      Number(request.params.id),
      request.body.name,
      request.body.calorieCount,
      request.body.published,
    )

    // if (request.body.images && request.body.images.length) {
    //   const promises = request.body.images.map(async (image) => {
    //     return updateImage(request.log, image)
    //   })
    //   await Promise.all(promises)
    //     .then((response) => {
    //       return response
    //     })
    //     .catch((err) => {
    //       request.log.error(err)
    //     })
    // }

    const cache = request.serverCache()
    if (cache && cache.has('recipes')) {
      cache.del('recipes')
    }

    if (recipe && recipe.id) {
      const ingredient = await getIngredient(request.log, Number(recipe.id))
      if (ingredient) {
        return reply.code(HTTP_CODES.CREATED).send(ingredient)
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

export default updateIngredientOps
