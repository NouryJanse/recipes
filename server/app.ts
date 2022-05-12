import path from 'path'
import AutoLoad from 'fastify-autoload'
import fp from 'fastify-plugin'
import fastifyAuth0 from 'fastify-auth0-verify'
import { fastifySwagger } from 'fastify-swagger'
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'

export default fp(
  (
    server: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // Place your custom code here!
    server.register(fastifyAuth0, {
      domain: process.env.AUTH0_DOMAIN,
      secret: process.env.AUTH0_SECRET,
    })

    server.register(fastifySwagger, {
      exposeRoute: true,
      routePrefix: '/docs',
      swagger: {
        info: {
          title: 'Recipes API',
          description: 'Documentation on the REST API',
          version: '0.1.0',
        },
      },
    })

    // Do not touch the following lines!

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    server.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins'),
      options: { ...{}, ...opts },
    })

    // This loads all plugins defined in routes
    // define your routes in one of these
    server.register(AutoLoad, {
      dir: path.join(__dirname, 'routes'),
      options: { ...{}, ...opts },
    })
    next()
  },
)
