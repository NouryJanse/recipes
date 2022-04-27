import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyError,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';
// import ops from './ops';

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    server.post('/api/users/login', {
      handler: async (_request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
        // 1. validation authorisation of webhook
        // 2. get data from request.body and process it

        // const user = request.user;
        return reply.code(200).send({ title: 'test' });
      },
      // preValidation: server.authenticate,
    });

    server.post('/api/users/register', {
      handler: async (_request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
        // 1. validation authorisation of webhook
        // 2. get data from request.body and process it

        // const user = request.user;
        return reply.code(201).send({ title: 'test' });
      },
      // preValidation: server.authenticate,
    });

    next();
  },
);
