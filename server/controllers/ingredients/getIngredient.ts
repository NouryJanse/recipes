import { Ingredient, Recipe } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { formatRecipeImages } from '../../helpers'
import { getIngredient } from '../../models/ingredients'
import IdIsOfInvalidFormat from '../../types/IdIsOfInvalidFormat'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'

const getIngredientOps = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    const ingredient: Ingredient = await getIngredient(request.log, Number(request.params.id))
    return reply.code(HTTP_CODES.OK).send(ingredient)
  } catch (error) {
    request.log.error(error)
    if (error instanceof ObjectCouldNotBeFoundError) {
      return reply.code(HTTP_CODES.NOT_FOUND).send({ message: error.message })
    }
    if (error instanceof IdIsOfInvalidFormat) {
      return reply.code(HTTP_CODES.UNPROCESSABLE_ENTITY).send({ message: error.message })
    }
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default getIngredientOps
