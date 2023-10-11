import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyError,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import fp from 'fastify-plugin'
// import ops from './ops';

// this file represents the webhooks part of the back-end. This code is fired when users either login or register in the application.
// it's purpose is to sync this data into the custom database, save the user accounts (especially the ID's) so that we can later retrieve all data associated to these accounts
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
        return reply.code(200).send({})
      },
      // preValidation: server.authenticate,
    })

    server.post('/api/users/register', {
      handler: async (_request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
        // 1. validation authorisation of webhook
        // 2. get data from request.body and process it

        // const user = request.user;
        return reply.code(201).send({})
      },
      // preValidation: server.authenticate,
    })

    next()
  },
)
