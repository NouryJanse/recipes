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
    server.post('/api/ingredients', {
      handler: ops.createIngredientOps,
      preValidation: server.authenticate,
    });

    next();
  },
);
