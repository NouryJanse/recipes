'use strict';

import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    server.get('/recipes', async function () {
      return { recipes: [{}, {}] };
    });
    next();
  },
);

// interface Recipe {
//   id: number;
//   title?: string;
// }

// const recipePrint = (title: string): Recipe => {
//   const recipe: Recipe = {
//     id: 0,
//     title,
//   };
//   return recipe;
// };

// recipePrint('test');

// const test = {};

// fastify.get('/', async (request) => {
//   request.log.info('Some info about the current request');
//   return { Test: 'This is working fine 2' };
// });

// fastify.post('/recipe', async (request) => {
//   try {
//     const body = { ...(request.body as object) };
//     return {
//       ...body,
//       test,
//       modified_at: Date.now(),
//     };
//   } catch (error) {
//     request.log.error(error);
//     return {};
//   }
// });
