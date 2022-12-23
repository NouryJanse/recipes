import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import fp from 'fastify-plugin'
import {
  getIngredientsOps,
  createIngredientOps,
  getIngredientOps,
  deleteIngredientOps,
  updateIngredientOps,
} from '../../controllers/ingredients/'

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

    // GET RECIPE
    server.get('/api/ingredients/:id', {
      handler: getIngredientOps,
    })

    // UPDATE RECIPE
    server.put('/api/ingredients/:id', {
      handler: updateIngredientOps,
      preValidation: server.authenticate,
    })

    // DELETE RECIPE
    server.delete('/api/ingredients/:id', {
      handler: deleteIngredientOps,
      preValidation: server.authenticate,
    })

    next()
  },
)
