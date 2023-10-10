import { PrismaClient, Recipe } from "@prisma/client";
import { ERROR_MESSAGES } from "../../constants";
// import { formatRecipeImages } from "../../helpers";
import NoContentError from "../../types/NoContentError";

const prisma = new PrismaClient();

const getRecipes = async (): Promise<Recipe[] | false> => {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        Image: {
          orderBy: {
            position: "asc",
          },
        },
        RecipeIngredients: {
          include: {
            ingredient: true,
          },
          orderBy: {
            amount: "desc",
          },
        },
      },
    });

    if (!recipes.length) throw new NoContentError(ERROR_MESSAGES.NO_RECIPES_FOUND);
    return recipes;
    // return formatRecipeImages(recipes);
  } catch (error) {
    // LOG ERROR
    if (error instanceof NoContentError) {
      throw new NoContentError(error.message);
    }
    throw error;
  } finally {
    async (): Promise<void> => {
      await prisma.$disconnect();
    };
  }
};

export default getRecipes;
