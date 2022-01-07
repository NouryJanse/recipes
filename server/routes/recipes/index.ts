import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import fp from 'fastify-plugin';
import ops from './ops';

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    server.post('/api/recipes', {
      handler: ops.postRecipeOps,
      preValidation: server.authenticate,
    });

    server.get('/api/recipes', ops.getRecipesOps);

    server.get('/api/recipes/:id', {
      handler: ops.getRecipeOps,
      preValidation: server.authenticate,
    });

    server.put('/api/recipes/:id', ops.updateRecipeOps);

    server.delete('/api/recipes/:id', ops.deleteRecipeOps);

    next();
  },
);
