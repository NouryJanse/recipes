import { Recipe } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { formatRecipeImages } from '../../helpers'
import { getRecipe } from '../../models/recipes'
import { ObjectCouldNotBeFoundError } from '../../types/Error'

const getRecipeOps = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    const recipe: Recipe = await getRecipe(request.log, Number(request.params.id))
    return reply.code(HTTP_CODES.OK).send(formatRecipeImages([recipe])[0])
  } catch (error) {
    request.log.error(error)
    if (error instanceof ObjectCouldNotBeFoundError) {
      return reply.code(HTTP_CODES.NOT_FOUND).send({ message: error.message })
    }
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default getRecipeOps
