import path from 'path'
import AutoLoad from 'fastify-autoload'
import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'

export default fp(
  (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // This loads all plugins defined in support plugins that are reused through the application
    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins'),
      options: { ...{}, ...opts },
    })

    // This loads all plugins defined in routes
    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'routes'),
      options: { ...{}, ...opts },
    })

    next()
  },
)
