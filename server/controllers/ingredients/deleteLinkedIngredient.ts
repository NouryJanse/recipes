import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { deleteLinkedIngredient } from '../../models/ingredients'

const deleteIngredientOps = async (
  request: FastifyRequest<{
    Body: FastifyIngredientBody
    Params: FastifyIngredientParams
  }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    // improve the cache by implementing an id system so that individual recipes can be invalidated
    const cache = request.serverCache()

    await deleteLinkedIngredient(request.log, Number(request.params.id))
    if (cache && cache.has('ingredients')) {
      cache.del('ingredients')
    }

    return reply.code(HTTP_CODES.OK).send({})
  } catch (error) {
    request.log.error(error)
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default deleteIngredientOps
