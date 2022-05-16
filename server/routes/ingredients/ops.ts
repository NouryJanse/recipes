import { Ingredient, PrismaClient } from '@prisma/client'
import { FastifyLoggerInstance, FastifyReply, FastifyRequest } from 'fastify'
import NodeCache from 'node-cache'

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
  request: FastifyRequest<{ Body: RecipeBody; Params: RecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  // const user = request.user
  const recipe = await createIngredient(request.log, request.body.name)

  if (recipe) {
    return reply.code(201).send({})
  }
  return reply.code(500).send({})
}

export default {
  createIngredientOps,
}
