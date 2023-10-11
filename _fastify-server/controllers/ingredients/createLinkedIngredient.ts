import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { createLinkedIngredient } from '../../models/ingredients'
import ObjectAlreadyExistsError from '../../types/ObjectAlreadyExistsError'

const linkIngredientToRecipeOps = async (
  request: FastifyRequest<{ Body: FastifyIngredientRecipeBody }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    const ingredient = await createLinkedIngredient(
      request.log,
      request.body.recipeId,
      request.body.ingredientId,
      request.body.unit,
      request.body.amount,
    )

    if (!ingredient) throw new Error('An error occurred')

    const cache = request.serverCache()
    if (cache) {
      cache.del('ingredients')
      cache.del('recipes')
    }

    return reply.code(HTTP_CODES.CREATED).send([])
  } catch (error) {
    request.log.error(error)
    if (error instanceof ObjectAlreadyExistsError) {
      return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default linkIngredientToRecipeOps
