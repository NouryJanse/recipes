import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import * as recipes from '../../data.json';
import NodeCache from 'node-cache';

const prisma = new PrismaClient();
const cache = new NodeCache({ stdTTL: 15 });

const getRecipes = async (): Promise<any> => {
  try {
    if (cache.has('recipes')) {
      return cache.get('recipes');
    }

    const recipes = await prisma.recipe.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
    cache.set('recipes', recipes);
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
  _authorId: number,
  course: string,
): Promise<any> => {
  try {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        course,
        // authorId: id,
      },
    });
    cache.del('recipes');
    return recipe;
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

const updateRecipe = async (
  id: number,
  name: string,
  description: string,
  _authorId: number,
  course: string,
): Promise<any> => {
  try {
    const recipe = await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        // authorId: id,
        course,
      },
    });
    cache.del('recipes');
    return recipe;
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

const deleteRecipe = async (id: number): Promise<any> => {
  if (!id) return false;
  try {
    await prisma.recipe.delete({
      where: {
        id,
      },
    });
    cache.del('recipes');
    return;
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

const postRecipeOps = async (request: any, reply: FastifyReply): Promise<FastifyReply> => {
  const user = request.user;
  const recipe = await createRecipe(
    request.body.name,
    request.body.description,
    request.body.authorId,
    request.body.course,
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

const updateRecipeOps = async (request: any, reply: FastifyReply): Promise<FastifyReply> => {
  // const user = request.user;
  const recipe = await updateRecipe(
    Number.parseInt(request.params.id),
    request.body.name,
    request.body.description,
    request.body.authorId,
    request.body.course,
  );
  const recipes = await getRecipes();
  return reply.code(201).send({ recipes });
};

const deleteRecipeOps = async (request: any, reply: FastifyReply) => {
  const res = await deleteRecipe(Number.parseInt(request.params.id));
  const recipes = await getRecipes();
  return reply.code(201).send({ recipes });
};

export default {
  postRecipeOps,
  getRecipesOps,
  getRecipeOps,
  updateRecipeOps,
  deleteRecipeOps,
};
