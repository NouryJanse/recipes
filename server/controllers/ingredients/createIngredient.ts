import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { createIngredient, getIngredients } from '../../models/ingredients'
import ObjectAlreadyExistsError from '../../types/ObjectAlreadyExistsError'

const createIngredientOps = async (
  request: FastifyRequest<{ Body: FastifyIngredientBody }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    console.log(request.body)
    const ingredient = await createIngredient(
      request.log,
      request.body.name,
      request.body.calorieCount,
      request.body.published,
    )

    if (!ingredient) throw new Error('An error occurred')

    const ingredients = await getIngredients(request.log)

    const cache = request.serverCache()
    if (cache && cache.has('ingredients')) {
      cache.del('ingredients')
    }

    return reply.code(HTTP_CODES.CREATED).send({ ingredients })
  } catch (error) {
    request.log.error(error)
    if (error instanceof ObjectAlreadyExistsError) {
      return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default createIngredientOps
