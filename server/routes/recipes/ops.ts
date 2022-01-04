import { FastifyRequest, FastifyReply } from 'fastify';
import { Recipe } from './Recipe';
import * as recipes from '../../data.json';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getRecipe = async (): Promise<any> => {
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

const createRecipe = async (): Promise<any> => {
  try {
    const response = await prisma.recipe.create({
      data: {
        name: 'test',
      },
    });
    console.log(response);
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
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  const user = request.user;

  console.log(user, request.body);
  const recipes = await createRecipe();
  console.log(recipes);
  return reply.code(201).send({ title: 'test' });
};

const getRecipesOps = async () => {
  console.log(recipePrint('test'));
  return { recipes: recipes.recipes };
};

const getRecipeOps = async (request: any, reply: FastifyReply) => {
  const user = request.user;
  console.log(user, request.body);
  // const recipes = await addRecipe();
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
