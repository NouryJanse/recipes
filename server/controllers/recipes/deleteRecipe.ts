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

    const recipes = await getRecipes(request.log)

    return reply.code(HTTP_CODES.CREATED).send({ recipes })
  } catch (error) {
    request.log.error(error)
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default deleteRecipeOps
