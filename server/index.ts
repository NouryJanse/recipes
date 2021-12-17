const res = require('dotenv').config({ path: '../config/.env.dev' });
const fastify = require('fastify')({
  logger: true,
});

interface Recipe {
  id: number;
  title?: string;
}

const recipe: Recipe = {
  id: 0,
  title: "test",
}

const recipePrint = (title:string) => {
  const recipe:Recipe = {
    id: 0,
    title
  }
  return recipe;
}

if (res.error) {
  throw res.error;
}

const test = {};

fastify.register(require('fastify-cors'), {
  origin: "*",
});

fastify.get('/', async () => {
  return {
    Test: 'This is working fine'
  };
});

fastify.post('/recipe', async (req: Request) => {
  return {
      ...req.body,
      test,
      modified_at: Date.now(),
  }
  // return reply.code(201).send({
    //   ...req.body,
    //   test,
    //   modified_at: Date.now(),
  // })
});

const serve = async () => {
  try {
    await fastify.listen(process.env.PORT);
    fastify.log.info(`Server listening to PORT ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
serve();