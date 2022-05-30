import { Ingredient, PrismaClient } from '@prisma/client'
import { FastifyLoggerInstance, FastifyReply, FastifyRequest } from 'fastify'
import NodeCache from 'node-cache'
import { HTTP_CODES } from '../../constants'

const prisma = new PrismaClient()
const cache = new NodeCache({ stdTTL: 15 })

const createIngredient = async (
  logger: FastifyLoggerInstance,
  name: string,
): Promise<Ingredient | false> => {
  try {
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
      },
    })
    cache.del('ingredients')
    return ingredient
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

const createIngredientOps = async (
  request: FastifyRequest<{ Body: FastifyRecipeBody; Params: FastifyRecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  // const user = request.user
  const recipe = await createIngredient(request.log, request.body.name)

  if (recipe) {
    return reply.code(HTTP_CODES.CREATED).send({})
  }
  return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
}

export default {
  createIngredientOps,
}
