import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyError,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import fp from 'fastify-plugin';

const postRecipeOps = async (
  _req: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  return reply.code(201).send({ title: 'test' });
};

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    server.post('/api/recipes', postRecipeOps);

    server.get('/api/recipes', async () => {
      return { recipes: [{}, {}] };
    });

    server.get('/api/recipes/:id', async () => {
      return { title: 'Pasta' };
    });

    server.put('/api/recipes/:id', async () => {
      return { title: 'Pasta' };
    });

    server.delete('/api/recipes/:id', async () => {
      return { title: 'Pasta' };
    });

    next();
  },
);

// interface Recipe {
//   id: number;
//   title?: string;
// }

// const recipePrint = (title: string): Recipe => {
//   const recipe: Recipe = {
//     id: 0,
//     title,
//   };
//   return recipe;
// };

// recipePrint('test');

// const test = {};

// fastify.get('/', async (request) => {
//   request.log.info('Some info about the current request');
//   return { Test: 'This is working fine 2' };
// });

// fastify.post('/recipe', async (request) => {
//   try {
//     const body = { ...(request.body as object) };
//     return {
//       ...body,
//       test,
//       modified_at: Date.now(),
//     };
//   } catch (error) {
//     request.log.error(error);
//     return {};
//   }
// });
