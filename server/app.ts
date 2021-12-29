'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

export default fp(
  (
    server: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // Place here your custom code!

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    server.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins'),
      options: Object.assign({}, opts),
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    server.register(AutoLoad, {
      dir: path.join(__dirname, 'routes'),
      options: Object.assign({}, opts),
    });
    next();
  },
);
