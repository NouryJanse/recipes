import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { createRecipe, getRecipes } from '../../models/recipes'
import { ObjectAlreadyExistsError } from '../../types/Error'

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

    const cache = request.serverCache()
    if (cache && cache.has('recipes')) {
      cache.del('recipes')
    }

    return reply.code(HTTP_CODES.CREATED).send({ recipes })
  } catch (error) {
    request.log.error(error)
    if (error instanceof ObjectAlreadyExistsError) {
      return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default createRecipeOps
