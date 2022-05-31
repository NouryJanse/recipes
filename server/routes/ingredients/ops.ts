import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import NodeCache from 'node-cache'
import { HTTP_CODES } from '../../constants'
import { createIngredient } from '../../models/ingredients'

const prisma = new PrismaClient()
const cache = new NodeCache({ stdTTL: 15 })

const createIngredientOps = async (
  request: FastifyRequest<{ Body: FastifyRecipeBody; Params: FastifyRecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  // const user = request.user
  const recipe = await createIngredient(request.log, request.body.name)
  cache.del('ingredients')

  if (recipe) {
    return reply.code(HTTP_CODES.CREATED).send({})
  }
  return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
}

export default {
  createIngredientOps,
}
