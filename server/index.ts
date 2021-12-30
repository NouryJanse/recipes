import * as dotenv from 'dotenv';
import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import cors from 'fastify-cors';
import { Server, IncomingMessage, ServerResponse } from 'http';
import App from './app';

dotenv.config({ path: '../config/.env.dev' });
if (!process.env.PORT) dotenv.config({ path: '../../config/.env.dev' });

const fastify: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  Fastify({ logger: true, pluginTimeout: 10000 });

fastify.register(App);

fastify.register(function (server: any, _options, done) {
  server.get('/verify', {
    handler: function (request: any, reply: FastifyReply) {
      reply.send(request.user);
    },
    preValidation: server.authenticate,
  });
  done();
});

fastify.register(cors, {
  origin: '*',
});

fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
