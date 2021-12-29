import path from 'path';
import AutoLoad from 'fastify-autoload';
import fp from 'fastify-plugin';
import { fastifySwagger } from 'fastify-swagger';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

export default fp(
  (
    server: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // Place your custom code here!
    server.register(fastifySwagger, {
      exposeRoute: true,
      routePrefix: '/docs',
      swagger: {
        info: {
          title: 'Recipes API',
          description: 'Recipes API Swagger docs',
          version: '0.1.0',
        },
      },
    });

    // Do not touch the following lines!

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    server.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins'),
      options: { ...{}, ...opts },
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    server.register(AutoLoad, {
      dir: path.join(__dirname, 'routes'),
      options: { ...{}, ...opts },
    });
    next();
  },
);
