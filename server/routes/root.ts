import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    server.get(
      '/',
      {
        schema: {
          // hide: true,
          description: 'Welcome to this Recipes API.',
          params: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'some random id',
              },
            },
          },
        },
      },
      async () => {
        return { hello: 'from root.js' }
      },
    )
    next()
  },
)
