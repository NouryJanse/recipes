import { FastifyRequest, FastifyReply } from 'fastify';
import { Recipe } from './Recipe';

const recipePrint = (title: string): Recipe => {
  const recipe: Recipe = {
    id: 0,
    title,
  };
  return recipe;
};

const postRecipeOps = async (
  _req: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  return reply.code(201).send({ title: 'test' });
};

const getRecipesOps = async () => {
  console.log(recipePrint('test'));
  return { recipes: [{}, {}] };
};

const getRecipeOps = (_request: any, reply: FastifyReply) => {
  // const user = request.user;
  // console.log(user);
  return reply.code(201).send({ title: 'frieten' });
};

const updateRecipeOps = async () => {
  return { recipes: [{}, {}] };
};

const deleteRecipeOps = async () => {
  return { title: 'Pasta' };
};

export default {
  postRecipeOps,
  getRecipesOps,
  getRecipeOps,
  updateRecipeOps,
  deleteRecipeOps,
};
