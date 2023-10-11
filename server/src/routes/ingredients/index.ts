import express from 'express'
import { Ingredient, Recipe } from '@prisma/client'
import {
  createIngredient,
  createLinkedIngredient,
  deleteIngredient,
  deleteLinkedIngredient,
  getIngredient,
  getIngredients,
  updateIngredient,
  updateLinkedIngredient,
} from '../../models/ingredients'

// import ObjectAlreadyExistsError from "../../types/ObjectAlreadyExistsError";
import { updateImage } from '../../models/images'
import { formatRecipeImages } from '../../helpers'
import { ERROR_MESSAGES, HTTP_CODES } from '../../constants'
import ObjectAlreadyExistsError from '../../types/ObjectAlreadyExistsError'
import NoContentError from '../../types/NoContentError'
import ObjectCouldNotBeFoundError from '../../types/ObjectCouldNotBeFoundError'
import IdIsOfInvalidFormat from '../../types/IdIsOfInvalidFormat'

const router = express.Router()

// CREATE INGREDIENT
router.post('/api/ingredients', async (req, res) => {
  try {
    const { name, unit, calorieCount, published } = req.body
    const ingredient = await createIngredient(name, unit, calorieCount, published)

    if (!ingredient) throw new Error('An error occurred')

    const ingredients = await getIngredients()

    // const cache = req.serverCache()
    // if (cache && cache.has('ingredients')) {
    //   cache.del('ingredients')
    // }

    return res.status(HTTP_CODES.CREATED).send({ ingredients })
  } catch (error) {
    // LOG
    if (error instanceof ObjectAlreadyExistsError) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// GET INGREDIENTS
router.get('/api/ingredients', async (req, res) => {
  try {
    // const cache = request.serverCache()
    // improve the cache by implementing an id system so that individual recipes can be invalidated
    // if (cache && cache.has('ingredients')) {
    // return res.send(HTTP_CODES.OK).send(cache.get('ingredients'))
    // } else if (cache && !cache.has('ingredients')) {
    const ingredients = await getIngredients()
    // cache.set('ingredients', ingredients)
    return res.status(HTTP_CODES.OK).send(ingredients)
    // }

    // const recipes = await getIngredients()
    // if (recipes && recipes.length) {
    //   return res.status(HTTP_CODES.OK).send(recipes)
    // }
    // return res.status(HTTP_CODES.NO_CONTENT).send(recipes)
  } catch (error) {
    // request.log.error(error)
    if (error instanceof NoContentError) {
      return res.status(HTTP_CODES.NO_CONTENT).send({ message: error.message })
    }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// GET INGREDIENT
router.get('/api/ingredients/:id', async (req, res) => {
  try {
    const { id } = req.params
    const ingredient: Ingredient = await getIngredient(Number.parseInt(id, 10))
    return res.status(HTTP_CODES.OK).send(ingredient)
  } catch (error) {
    // request.log.error(error)
    if (error instanceof ObjectCouldNotBeFoundError) {
      return res.status(HTTP_CODES.NOT_FOUND).send({ message: error.message })
    }
    if (error instanceof IdIsOfInvalidFormat) {
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send({ message: error.message })
    }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// UPDATE INGREDIENT
router.put('/api/ingredients/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, unit, calorieCount, published } = req.body
    const recipe = await updateIngredient(Number(id), name, unit, calorieCount, published)

    // const cache = req.serverCache()
    // if (cache && cache.has('ingredients')) {
    //   cache.del('ingredients')
    // }

    if (recipe && recipe.id) {
      const ingredient = await getIngredient(Number(recipe.id))
      if (ingredient) {
        return res.send(HTTP_CODES.CREATED).send(ingredient)
      }
    }
    // req.log.info('Not found')
    return res.send(HTTP_CODES.NOT_FOUND).send({})
  } catch (error) {
    // req.log.error(error)
    if (error instanceof ObjectCouldNotBeFoundError) {
      return res.send(HTTP_CODES.UNPROCESSABLE_ENTITY).send({ message: error.message })
    }
    return res
      .send(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
  }
})

// DELETE INGREDIENT
router.delete('/api/ingredients/:id', async (req, res) => {
  try {
    const { id } = req.params
    // improve the cache by implementing an id system so that individual recipes can be invalidated
    // const cache = request.serverCache()

    await deleteIngredient(Number(id))
    // if (cache && cache.has('ingredients')) {
    //   cache.del('ingredients')
    // }

    return res.status(HTTP_CODES.OK).send({})
  } catch (error) {
    // request.log.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

/*
 * RECIPE INGREDIENTS
 */

// LINK INGREDIENT TO RECIPE
router.post('/api/ingredients/recipe', async (req, res) => {
  try {
    const { recipeId, ingredientId, unit, amount } = req.body
    const ingredient = await createLinkedIngredient(
      recipeId,
      ingredientId,
      unit,
      Number.parseInt(amount, 10),
    )

    if (!ingredient) throw new Error('An error occurred')

    // const cache = req.serverCache()
    // if (cache) {
    //   cache.del('ingredients')
    //   cache.del('recipes')
    // }

    return res.status(HTTP_CODES.CREATED).send([])
  } catch (error) {
    console.error(error)
    // req.log.error(error)
    if (error instanceof ObjectAlreadyExistsError) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// UPDATE INGREDIENT RECIPE LINK
router.put('/api/ingredients/recipe/:id', async (req, res) => {
  try {
    const { id, recipeId, ingredientId, addedAt, unit, description, amount } = req.body
    const ingredient = await updateLinkedIngredient({
      id,
      recipeId,
      ingredientId,
      addedAt,
      unit,
      description,
      amount,
    })

    // const cache = request.serverCache()
    // if (cache) {
    //   cache.del('ingredients')
    //   cache.del('recipes')
    // }

    if (ingredient && ingredient.id) {
      return res.status(HTTP_CODES.CREATED).send(ingredient)
    }
    // request.log.info('Not found')
    return res.status(HTTP_CODES.NOT_FOUND).send({})
  } catch (error) {
    // request.log.error(error)
    if (error instanceof ObjectCouldNotBeFoundError) {
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send({ message: error.message })
    }
    return res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
  }
})

// DELETE INGREDIENT RECIPE LINK
router.delete('/api/ingredients/recipe/:id', async (req, res) => {
  try {
    // improve the cache by implementing an id system so that individual recipes can be invalidated
    // const cache = request.serverCache()

    await deleteLinkedIngredient(Number(req.params.id))
    // if (cache && cache.has('recipes')) {
    //   cache.del('recipes')
    // }

    return res.status(HTTP_CODES.OK).send({})
  } catch (error) {
    // request.log.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

export default router
