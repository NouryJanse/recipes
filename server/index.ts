import * as dotenv from 'dotenv';
import Fastify, { FastifyInstance } from 'fastify';
import cors from 'fastify-cors';
import { Server, IncomingMessage, ServerResponse } from 'http';

dotenv.config({ path: '../config/.env.dev' });
if (!process.env.PORT) dotenv.config({ path: '../../config/.env.dev' });

const fastify: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  Fastify({ logger: true, pluginTimeout: 10000 });

import App from './app';

fastify.register(App);

fastify.register(cors, {
  origin: '*',
});

fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
