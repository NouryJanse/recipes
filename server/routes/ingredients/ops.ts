import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';
import NodeCache from 'node-cache';

const prisma = new PrismaClient();
const cache = new NodeCache({ stdTTL: 15 });

const createIngredient = async (name: string): Promise<any> => {
  try {
    const recipe = await prisma.ingredient.create({
      data: {
        name,
      },
    });
    cache.del('ingredients');
    return recipe;
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

const createIngredientOps = async (request: any, reply: FastifyReply): Promise<FastifyReply> => {
  const user = request.user;
  const recipe = await createIngredient(request.body.name);
  // const recipes = await getRecipes();
  // return reply.code(201).send({ recipes });
  return reply.code(201).send({});
};

export default {
  createIngredientOps,
};
