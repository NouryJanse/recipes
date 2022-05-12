import { Ingredient, PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import NodeCache from 'node-cache'

const prisma = new PrismaClient()
const cache = new NodeCache({ stdTTL: 15 })

const createIngredient = async (name: string): Promise<Ingredient | false> => {
  try {
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
      },
    })
    cache.del('ingredients')
    return ingredient
  } catch (error) {
    console.error(error)
    return false
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}

const createIngredientOps = async (
  request: FastifyRequest<{ Body: RecipeBody; Params: RecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  const user = request.user
  const recipe = await createIngredient(request.body.name)
  if (recipe) {
    return reply.code(201).send({})
  } else {
    return reply.code(500).send({})
  }
}

export default {
  createIngredientOps,
}
