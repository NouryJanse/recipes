import { FastifyRequest, FastifyReply } from 'fastify';
import { Recipe } from './Recipe';
import * as recipes from '../../data.json';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const addRecipe = async (): Promise<any> => {
  try {
    const allUsers = await prisma.recipe.findMany();
    console.log(allUsers);
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

const recipePrint = async (title: string): Promise<Recipe> => {
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
  return { recipes: recipes.recipes };
};

const getRecipeOps = async (request: any, reply: FastifyReply) => {
  const user = request.user;
  console.log(user);
  const recipes = await addRecipe();
  return reply.code(201).send({ title: 'frieten', recipes });
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
