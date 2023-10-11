import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { getIngredients } from '../../models/ingredients'
import NoContentError from '../../types/NoContentError'

const getIngredientsOps = async (
  request: FastifyRequest<{
    Body: FastifyRecipeBody
    Params: FastifyRecipeParams
  }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    const cache = request.serverCache()
    // improve the cache by implementing an id system so that individual recipes can be invalidated
    if (cache && cache.has('ingredients')) {
      return reply.code(HTTP_CODES.OK).send(cache.get('ingredients'))
    } else if (cache && !cache.has('ingredients')) {
      const ingredients = await getIngredients(request.log)
      cache.set('ingredients', ingredients)
      return reply.code(HTTP_CODES.OK).send(ingredients)
    }

    const recipes = await getIngredients(request.log)
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

export default getIngredientsOps
