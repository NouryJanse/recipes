import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import NodeCache from 'node-cache'

const CACHE_TTL = 15 // 15 seconds to expire
const cache = new NodeCache({ stdTTL: CACHE_TTL })

// this declaration must be in scope of the typescript interpreter to work
declare module 'fastify' {
  interface FastifyRequest {
    serverCache: () => NodeCache | false
  }
}

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    server.decorateRequest(
      'serverCache',
      (
        _server: FastifyInstance,
        _opts: FastifyPluginOptions,
        _next: (error?: FastifyError) => void,
      ) => {
        // should be changed to USE_CACHE var
        if (process.env.ENV !== 'test') {
          return cache
        } else {
          return false
        }
      },
    )
    next()
  },
)
