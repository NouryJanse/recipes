import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { linkIngredientToRecipe } from '../../models/ingredients'
import ObjectAlreadyExistsError from '../../types/ObjectAlreadyExistsError'

const linkIngredientToRecipeOps = async (
  request: FastifyRequest<{ Body: FastifyIngredientRecipeBody }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    console.log(request.body)
    const ingredient = await linkIngredientToRecipe(
      request.log,
      request.body.recipeId,
      request.body.ingredientId,
      request.body.unit,
      request.body.amount,
    )

    if (!ingredient) throw new Error('An error occurred')

    // const ingredients = await getRecipeWithIngredients(request.log)

    const cache = request.serverCache()
    if (cache && cache.has('ingredients')) {
      cache.del('ingredients')
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
