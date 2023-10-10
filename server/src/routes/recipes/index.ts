import express from 'express'
import { Recipe } from '@prisma/client'
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from '../../models/recipes'
// import ObjectAlreadyExistsError from "../../types/ObjectAlreadyExistsError";
import { updateImage } from '../../models/images'
import { formatRecipeImages } from '../../helpers'
import { ERROR_MESSAGES, HTTP_CODES } from '../../constants'

const router = express.Router()

// CREATE RECIPE
router.post('/api/recipes', async (req, res) => {
  try {
    const { name, description, authorId, course } = req.body
    const recipe = await createRecipe(name, description, authorId, course)
    if (!recipe) throw new Error('An error occurred')
    const recipes = await getRecipes()

    // const cache = req.serverCache()
    // if (cache && cache.has('recipes')) {
    //   cache.del('recipes')
    // }

    return res.status(HTTP_CODES.CREATED).send({ recipes })
  } catch (error) {
    console.error(error)
    // if (error instanceof ObjectAlreadyExistsError) {
    //   return res.sendStatus(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    // }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
  }
})

// // GET RECIPES
router.get('/api/recipes', async (req, res) => {
  const recipes = await getRecipes()
  res.status(200).send(recipes)
})

// // GET RECIPE
router.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe: Recipe = await getRecipe(Number.parseInt(req.params.id, 10))
    return res.status(HTTP_CODES.OK).send(formatRecipeImages([recipe])[0])
    // res.status(HTTP_CODES.OK).send(recipe)
  } catch (error) {
    // req.log.error(error);
    // if (error instanceof ObjectCouldNotBeFoundError) {
    //   return reply.code(HTTP_CODES.NOT_FOUND).send({ message: error.message });
    // }
    // if (error instanceof IdIsOfInvalidFormat) {
    //   return reply.code(HTTP_CODES.UNPROCESSABLE_ENTITY).send({ message: error.message });
    // }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// UPDATE RECIPE
router.put('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await updateRecipe(
      Number(req.params.id),
      req.body.name,
      req.body.description,
      req.body.authorId,
      req.body.course,
    )

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
          // req.log.error(err);
        })
    }

    // const cache = req.serverCache();
    // if (cache && cache.has("recipes")) {
    //   cache.del("recipes");
    // }

    if (recipe && recipe.id) {
      const recipeWithImage = await getRecipe(Number(recipe.id))
      if (recipeWithImage) {
        return res.status(HTTP_CODES.CREATED).send(formatRecipeImages([recipeWithImage])[0])
      }
    }
    return res.status(HTTP_CODES.NOT_FOUND).send({})
  } catch (error) {
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
    // // improve the cache by implementing an id system so that individual recipes can be invalidated
    // const cache = request.serverCache();

    const result = await deleteRecipe(Number(id))
    // if (cache && cache.has("recipes")) {
    //   cache.del("recipes");
    // }

    return res.status(HTTP_CODES.OK).send(result)
  } catch (error) {
    // request.log.error(error);
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// SAVE RECIPE IMAGE
router.post('/api/recipes/image/:id', (req, res) => {
  res.send('About this wiki')
})

// DELETE RECIPE IMAGE
router.delete('/api/recipes/image', (req, res) => {
  res.send('About this wiki')
})

export default router
