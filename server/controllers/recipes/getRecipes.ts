import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { getRecipes } from '../../models/recipes'
import { NoContentError } from '../../types/Error'

const getRecipesOps = async (
  request: FastifyRequest<{
    Body: FastifyRecipeBody
    Params: FastifyRecipeParams
  }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    const cache = request.serverCache()
    // improve the cache by implementing an id system so that individual recipes can be invalidated
    if (cache && cache.has('recipes')) {
      return reply.code(HTTP_CODES.OK).send(cache.get('recipes'))
    } else if (cache) {
      const recipes = await getRecipes(request.log)
      cache.set('recipes', recipes)
      return reply.code(HTTP_CODES.OK).send(recipes)
    }

    const recipes = await getRecipes(request.log)
    if (recipes && recipes.length) {
      return reply.code(HTTP_CODES.OK).send(recipes)
    }
    return reply.code(HTTP_CODES.NO_CONTENT).send(recipes)
  } catch (error) {
    request.log.error(error)
    if (error instanceof NoContentError) {
      return reply.code(HTTP_CODES.NO_CONTENT).send({ message: error.message })
    }
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default getRecipesOps
