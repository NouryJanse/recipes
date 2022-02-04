import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import fp from 'fastify-plugin';
import ops from './ops';

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // CREATE RECIPE
    server.post('/api/recipes', {
      handler: ops.postRecipeOps,
      preValidation: server.authenticate,
    });

    // GET RECIPES
    server.get('/api/recipes', { handler: ops.getRecipesOps });

    // GET RECIPE
    server.get('/api/recipes/:id', {
      handler: ops.getRecipeOps,
    });

    // UPDATE RECIPE
    server.put('/api/recipes/:id', {
      handler: ops.updateRecipeOps,
      preValidation: server.authenticate,
    });

    // DELETE RECIPE
    server.delete('/api/recipes/:id', {
      handler: ops.deleteRecipeOps,
      preValidation: server.authenticate,
    });

    next();
  },
);
