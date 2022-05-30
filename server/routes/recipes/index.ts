import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import fp from 'fastify-plugin'
import ops from './controllers'

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // CREATE RECIPE
    server.post('/api/recipes', {
      handler: ops.createRecipeOps,
      preValidation: server.authenticate,
    })

    // GET RECIPES
    server.get('/api/recipes', { handler: ops.getRecipesOps })

    // GET RECIPE
    server.get('/api/recipes/:id', {
      handler: ops.getRecipeOps,
    })

    // UPDATE RECIPE
    server.put('/api/recipes/:id', {
      handler: ops.updateRecipeOps,
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
      handler: ops.deleteRecipeOps,
      preValidation: server.authenticate,
    })

    next()
  },
)
