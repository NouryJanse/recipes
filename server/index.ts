import dotenv = require('dotenv');
import Fastify from 'fastify';
import cors = require('fastify-cors');

const fastify = Fastify();

dotenv.config({ path: '../config/.env.dev' });
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

fastify.get('/', async () => ({ Test: 'This is working fine' }));

fastify.post(
  '/recipe',
  async (): Promise<
    FastifyInstance<Server, IncomingMessage, ServerResponse>
  > => ({
    ...req.body,
    test,
    modified_at: Date.now(),
  }),
);

const serve = async (): Promise<void> => {
  try {
    const port: string = process.env.port as string;
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

serve();
