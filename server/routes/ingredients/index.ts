import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import fp from 'fastify-plugin'
import { getIngredientsOps, createIngredientOps } from '../../controllers/ingredients/'

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // CREATE INGREDIENT
    server.post('/api/ingredients', {
      handler: createIngredientOps,
      preValidation: server.authenticate,
    })

    // GET INGREDIENTS
    server.get('/api/ingredients', { handler: getIngredientsOps })

    next()
  },
)
