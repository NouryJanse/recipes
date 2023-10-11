import * as dotenv from 'dotenv'
import Fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import { Server, IncomingMessage, ServerResponse } from 'http'
import fastifyAuth0 from 'fastify-auth0-verify'
import { fastifySwagger } from 'fastify-swagger'

import App from './app'

dotenv.config({ path: './.env' })
if (!process.env.PORT) dotenv.config({ path: '../.env' })

const environment = process.env.local ?? 'development'

// create Fastify's server instance
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: {
    prettyPrint:
      environment === 'development'
        ? {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          }
        : false,
  },
  pluginTimeout: 10000,
  bodyLimit: 6242880, // === 5MB
})

// register a plugin for integrating Auth0 in Fastify
server.register(fastifyAuth0, {
  domain: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_SECRET,
})

// register a plugin for integrating Swagger in Fastify
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

server.register(App)

server.register(cors, {
  origin: '*',
})

// start the server
server.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
