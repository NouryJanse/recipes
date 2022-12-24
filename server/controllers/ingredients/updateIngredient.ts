import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES, ERROR_MESSAGES } from '../../constants'
import { getIngredient, updateIngredient } from '../../models/ingredients'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const updateIngredientOps = async (
  request: FastifyRequest<{ Body: FastifyIngredientBody; Params: FastifyIngredientParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    const recipe = await updateIngredient(
      request.log,
      Number(request.params.id),
      request.body.name,
      request.body.calorieCount,
      request.body.published,
    )

    const cache = request.serverCache()
    if (cache && cache.has('ingredients')) {
      cache.del('ingredients')
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
