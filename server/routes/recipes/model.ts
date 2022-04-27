import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { Image } from '@prisma/client';

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

    return recipe;
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

// type RecipeWithImage = Prisma.RecipeGetPayload<{
//   include: { Image: true };
// }>;

const getRecipes = async (): Promise<any> => {
  try {
    let recipes = await prisma.recipe.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        Image: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    recipes = recipes.map((recipe) => {
      if (recipe.Image && recipe.Image.length) {
        // @ts-ignore: weird error because relation typings are not generated
        recipe.images = recipe.Image;
        recipe.Image = [];
        return recipe;
      }
      return recipe;
    });

    return recipes;
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

    return;
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

const saveImage = async (image: Image): Promise<any> => {
  const data = {
    url: image.url,
    ...(image.width && { width: image.width }),
    ...(image.height && { height: image.height }),
    ...(image.recipeId && { recipeId: image.recipeId }),
  };
  // if (!id) return false;
  try {
    const dbImage = await prisma.image.upsert({
      where: { id: image.id },
      update: {
        ...(image.position && { position: image.position }),
        ...(image.url && { url: image.url }),
        ...(image.width && { width: image.width }),
        ...(image.height && { height: image.height }),
      },
      create: data,
    });

    return dbImage;
  } catch (error) {
    console.error(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
  return image.width;
};

export { getRecipes, createRecipe, updateRecipe, deleteRecipe, saveImage };
