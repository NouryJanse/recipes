import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { deleteRecipe, getRecipes } from '../../models/recipes'

const deleteRecipeOps = async (
  request: FastifyRequest<{
    Body: FastifyRecipeBody
    Params: FastifyRecipeParams
  }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    // improve the cache by implementing an id system so that individual recipes can be invalidated
    const cache = request.serverCache()

    await deleteRecipe(request.log, Number(request.params.id))
    if (cache && cache.has('recipes')) {
      cache.del('recipes')
    }

    return reply.code(HTTP_CODES.OK).send({})
  } catch (error) {
    console.log(error)
    request.log.error(error)
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default deleteRecipeOps
