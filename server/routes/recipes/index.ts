import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import fp from 'fastify-plugin'
import {
  createRecipeOps,
  deleteRecipeOps,
  getRecipeOps,
  getRecipesOps,
  updateRecipeOps,
} from '../../controllers/recipes'

import ops from './controllers'

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // CREATE RECIPE
    server.post('/api/recipes', {
      handler: createRecipeOps,
      preValidation: server.authenticate,
    })

    // GET RECIPES
    server.get('/api/recipes', { handler: getRecipesOps })

    // GET RECIPE
    server.get('/api/recipes/:id', {
      handler: getRecipeOps,
    })

    // UPDATE RECIPE
    server.put('/api/recipes/:id', {
      handler: updateRecipeOps,
      preValidation: server.authenticate,
    })

    // SAVE RECIPE IMAGE
    server.post('/api/recipes/image/:id', {
      handler: ops.createRecipeImageOps,
      preValidation: server.authenticate,
    })

    // DELETE RECIPE IMAGE
    server.delete('/api/recipes/image', {
      handler: ops.deleteRecipeImageOps,
      preValidation: server.authenticate,
    })

    // DELETE RECIPE
    server.delete('/api/recipes/:id', {
      handler: deleteRecipeOps,
      preValidation: server.authenticate,
    })

    next()
  },
)
