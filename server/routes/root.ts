'use strict';

import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    server.get('/', async function () {
      return { hello: 'from root.js' };
    });
    next();
  },
);
