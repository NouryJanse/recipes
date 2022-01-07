import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Recipe } from './Recipe';
import * as recipes from '../../data.json';

const prisma = new PrismaClient();

const getRecipes = async (): Promise<any> => {
  try {
    const recipes = await prisma.recipe.findMany();
    return recipes;
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

const createRecipe = async (
  name: string,
  description: string,
  _id: number,
): Promise<any> => {
  try {
    return await prisma.recipe.create({
      data: {
        name,
        description,
        // authorId: id,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

// const recipePrint = async (title: string): Promise<Recipe> => {
//   const recipe: Recipe = {
//     id: 0,
//     title,
//   };
//   return recipe;
// };

const postRecipeOps = async (
  request: any,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  const user = request.user;
  const recipe = await createRecipe(
    request.body.name,
    request.body.description,
    request.body.id,
  );
  const recipes = await getRecipes();
  return reply.code(201).send({ recipes });
};

const getRecipesOps = async (_request: FastifyRequest, reply: FastifyReply) => {
  const recipes = await getRecipes();
  return reply.code(200).send({ recipes });
};

const getRecipeOps = async (_request: any, reply: FastifyReply) => {
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
