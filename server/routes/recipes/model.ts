import { PrismaClient, Recipe, Image } from '@prisma/client'
const prisma = new PrismaClient()

const createRecipe = async (
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
    console.error(error)
    return false
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}

const getRecipes = async (): Promise<Recipe[] | false> => {
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
        recipe.images = recipe.Image
        recipe.Image = []
        return recipe
      }
      return recipe
    })

    return recipes
  } catch (error) {
    console.error(error)
    return false
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}

const getRecipe = async (id: number): Promise<Recipe | null | false> => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
    })
    return recipe
  } catch (error) {
    console.error(error)
    return false
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}

const updateRecipe = async (
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
    console.error(error)
    return false
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}

const deleteRecipe = async (id: number): Promise<boolean> => {
  if (!id) return false

  try {
    await prisma.recipe.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    console.error(error)
    return false
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}

const saveImage = async (image: CloudinaryImage, recipeId: number): Promise<Image | false> => {
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
    console.error(error)
    return false
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}

export { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe, saveImage }
