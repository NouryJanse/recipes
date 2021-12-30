import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyError,
  FastifyReply,
} from 'fastify';
import fp from 'fastify-plugin';
import ops from './ops';

export default fp(
  (
    server: any,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    server.post('/api/recipes', ops.postRecipeOps);

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

// fastify.get('/', async (request) => {
//   request.log.info('Some info about the current request');
//   return { Test: 'This is working fine 2' };
// });

// fastify.post('/recipe', async (request) => {
//   try {
//     const body = { ...(request.body as object) };
//     return {
//       ...body,
//       modified_at: Date.now(),
//     };
//   } catch (error) {
//     request.log.error(error);
//     return {};
//   }
// });
