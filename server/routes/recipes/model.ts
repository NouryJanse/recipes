import { PrismaClient, Recipe, Image } from '@prisma/client'
import { FastifyLoggerInstance } from 'fastify'

const prisma = new PrismaClient()

const createRecipe = async (
  logger: FastifyLoggerInstance,
  name: string,
  description: string,
  _authorId: number,
  course: string,
): Promise<Recipe | false> => {
  try {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        course,
      },
    })

    return recipe
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

const getRecipes = async (logger: FastifyLoggerInstance): Promise<Recipe[] | false> => {
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
    })

    recipes = recipes.map((recipe) => {
      if (recipe.Image && recipe.Image.length) {
        // @ts-ignore: weird error because relation typings are not generated
        return { ...recipe, images: recipe.Image, Image: [] }
      }
      return recipe
    })

    return recipes
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

const getRecipe = async (
  logger: FastifyLoggerInstance,
  id: number,
): Promise<Recipe | null | false> => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
    })
    return recipe
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

const updateRecipe = async (
  logger: FastifyLoggerInstance,
  id: number,
  name: string,
  description: string,
  _authorId: number,
  course: string,
): Promise<Recipe | false> => {
  try {
    const recipe = await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        course,
      },
    })

    return recipe
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

const deleteRecipe = async (logger: FastifyLoggerInstance, id: number): Promise<boolean> => {
  if (!id) return false

  try {
    await prisma.recipe.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

const saveImage = async (
  logger: FastifyLoggerInstance,
  image: CloudinaryImage,
  recipeId: number,
): Promise<Image | false> => {
  try {
    const dbImage: Image = await prisma.image.upsert({
      where: { cloudinaryId: image.asset_id },
      update: {
        ...(image.position && { position: image.position }),
        ...(image.url && { url: image.url }),
        ...(image.width && { width: image.width }),
        ...(image.height && { height: image.height }),
      },
      create: {
        url: image.url,
        ...(image.width && { width: image.width }),
        ...(image.height && { height: image.height }),
        cloudinaryId: image.asset_id,
        recipeId,
      },
    })

    return dbImage
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe, saveImage }
