import * as dotenv from 'dotenv'
import Fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import { Server, IncomingMessage, ServerResponse } from 'http'
import App from './app'

dotenv.config({ path: './.env' })
if (!process.env.PORT) dotenv.config({ path: '../.env.dev' })

const fastify: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: true,
  pluginTimeout: 10000,
})

fastify.register(App)

fastify.register(cors, {
  origin: '*',
})

fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
