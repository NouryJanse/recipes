import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import fp from 'fastify-plugin'

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // CREATE INGREDIENT
    server.post('/api/ingredients', {
      handler: (): void => {},
      preValidation: server.authenticate,
    })

    next()
  },
)
