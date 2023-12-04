import express from 'express'
import { Image, Recipe } from '@prisma/client'
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from '../../models/recipes'
// import ObjectAlreadyExistsError from "../../types/ObjectAlreadyExistsError";
import { createImage, deleteImage, updateImage } from '../../models/images'
import { formatRecipeImages } from '../../helpers'
import { ERROR_MESSAGES, HTTP_CODES } from '../../constants'

const router = express.Router()

// CREATE RECIPE
router.post('/api/recipes', async (req, res) => {
  try {
    const { name, description, authorId, course } = req.body
    const recipe = await createRecipe(name, description, authorId, course)
    if (!recipe) throw new Error('An error occurred')
    return res.status(HTTP_CODES.CREATED).send({ recipe })
  } catch (error) {
    console.error(error)
    // if (error instanceof ObjectAlreadyExistsError) {
    //   return res.sendStatus(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    // }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
  }
})

// GET RECIPES
router.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await getRecipes()
    res.status(200).send(recipes)
  } catch (error) {
    console.error(error)
    return res.status(HTTP_CODES.NOT_FOUND).send([])
  }
})

// GET RECIPE
router.get('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const recipe: Recipe = await getRecipe(Number.parseInt(id, 10))
    return res.status(HTTP_CODES.OK).send(formatRecipeImages([recipe])[0])
  } catch (error) {
    console.error(error)
    // if (error instanceof ObjectCouldNotBeFoundError) {
    //   return reply.code(HTTP_CODES.NOT_FOUND).send({ message: error.message });
    // }
    // if (error instanceof IdIsOfInvalidFormat) {
    //   return reply.code(HTTP_CODES.UNPROCESSABLE_ENTITY).send({ message: error.message });
    // }
    return res.status(HTTP_CODES.NOT_FOUND).send([])
  }
})

// UPDATE RECIPE
router.put('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, authorId, course, published } = req.body
    const recipe = await updateRecipe(Number(id), name, description, authorId, course, published)

    if (req.body.images && req.body.images.length) {
      const promises = req.body.images.map(async (image: any) => {
        return updateImage(image)
      })
      await Promise.all(promises)
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.error(err)
        })
    }

    if (recipe && recipe.id) {
      const recipeWithImage = await getRecipe(Number(recipe.id))
      if (recipeWithImage) {
        return res.status(HTTP_CODES.CREATED).send(formatRecipeImages([recipeWithImage])[0])
      }
    }
    return res.status(HTTP_CODES.NOT_FOUND).send({})
  } catch (error) {
    console.error(error)
    // if (error instanceof ObjectCouldNotBeFoundError) {
    //   return reply.code(HTTP_CODES.UNPROCESSABLE_ENTITY).send({ message: error.message });
    // }
    return res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
  }
})

// DELETE RECIPE
router.delete('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteRecipe(Number(id))
    return res.status(HTTP_CODES.OK).send(result)
  } catch (error) {
    console.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// SAVE RECIPE IMAGE
router.post('/api/recipes/image/:id', async (req, res) => {
  const recipeId = +req.params.id
  if (req.body.image.data) {
    const image: Image | false = await createImage(req.body.image.data, recipeId)
    if (image) {
      return res.status(HTTP_CODES.CREATED).send(image)
    }
  }
  console.error('An error occurred')
  return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
})

// DELETE RECIPE IMAGE
router.delete('/api/recipes/image', async (req, res) => {
  try {
    const { cloudinaryPublicId } = req.body
    await deleteImage(cloudinaryPublicId)
    return res.status(HTTP_CODES.OK).send({})
  } catch (error) {
    console.error('An error occurred')
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

export default router
