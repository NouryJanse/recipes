import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import cors from 'fastify-cors';

const fastify = Fastify();

dotenv.config({ path: '../config/.env.dev' });
if (!process.env.PORT) dotenv.config({ path: '../../config/.env.dev' });

Fastify({
  logger: true,
});

interface Recipe {
  id: number;
  title?: string;
}

const recipePrint = (title: string): Recipe => {
  const recipe: Recipe = {
    id: 0,
    title,
  };
  return recipe;
};

recipePrint('test');

const test = {};

fastify.register(cors, {
  origin: '*',
});

fastify.get('/', async () => ({ Test: 'This is working fine 2' }));

fastify.post('/recipe', async (req) => {
  try {
    const body = { ...(req.body as object) };
    return {
      ...body,
      test,
      modified_at: Date.now(),
    };
  } catch (error) {
    console.error(error);
  }
});

// const serve = async (): Promise<void> => {
//   try {
//     const port: string = process.env.PORT as string;
//     console.log(fastify.server.address());
//     // console.log(`${fastify.server.address().port}`);
//     await fastify.listen(port);
//   } catch (err) {
//     console.error(err);
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };

// serve();

fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
  }
});
