import express from 'express'
import { Ingredient } from '@prisma/client'
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
    return res.status(HTTP_CODES.CREATED).send({ ingredients })
  } catch (error) {
    console.error(error)
    if (error instanceof ObjectAlreadyExistsError) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// GET INGREDIENTS
router.get('/api/ingredients', async (req, res) => {
  try {
    const ingredients = await getIngredients()
    return res.status(HTTP_CODES.OK).send(ingredients)
  } catch (error) {
    console.error(error)
    if (error instanceof NoContentError) {
      return res.status(HTTP_CODES.NO_CONTENT).send([])
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
    console.error(error)
    if (error instanceof ObjectCouldNotBeFoundError) {
      return res.status(HTTP_CODES.NOT_FOUND).send({})
    }
    if (error instanceof IdIsOfInvalidFormat) {
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send({})
    }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// UPDATE INGREDIENT
router.put('/api/ingredients/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, unit, calorieCount, published } = req.body
    const ingredient = await updateIngredient(Number(id), name, unit, calorieCount, published)
    if (ingredient) {
      return res.status(HTTP_CODES.CREATED).send(ingredient)
    }
    return res.status(HTTP_CODES.NOT_FOUND).send(ingredient)
  } catch (error) {
    console.error(error)

    if (error instanceof ObjectCouldNotBeFoundError) {
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send({ message: error.message })
    } else {
      return res
        .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
    }
  }
})

// DELETE INGREDIENT
router.delete('/api/ingredients/:id', async (req, res) => {
  try {
    const { id } = req.params
    await deleteIngredient(Number(id))
    return res.status(HTTP_CODES.OK).send({})
  } catch (error) {
    console.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

/*
 * RECIPE INGREDIENTS
 */

// LINK INGREDIENT TO RECIPE
router.post('/api/ingredients/recipe', async (req, res) => {
  try {
    let ingredient = req.body
    let createdIngredient
    let linkedIngredient

    if (ingredient.ingredientId === undefined) {
      createdIngredient = await createIngredient(ingredient.name, ingredient.unit)
      if (createdIngredient) {
        linkedIngredient = await createLinkedIngredient(
          ingredient.recipeId,
          createdIngredient.id,
          ingredient.unit,
          Number.parseInt(ingredient.amount, 10),
        )
      }
    } else {
      linkedIngredient = await createLinkedIngredient(
        ingredient.recipeId,
        ingredient.ingredientId,
        ingredient.unit,
        Number.parseInt(ingredient.amount, 10),
      )
    }

    if (!linkedIngredient) throw new Error('An error occurred')

    return res.status(HTTP_CODES.CREATED).send([])
  } catch (error) {
    console.error(error)
    if (error instanceof ObjectAlreadyExistsError) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

// UPDATE INGREDIENT RECIPE LINK
router.put('/api/ingredients/recipe/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { recipeId, ingredientId, addedAt, unit, description, amount } = req.body
    const ingredient = await updateLinkedIngredient({
      id: Number.parseInt(id),
      recipeId,
      ingredientId,
      addedAt,
      unit,
      description,
      amount,
    })

    if (ingredient && ingredient.id) {
      return res.status(HTTP_CODES.CREATED).send(ingredient)
    }
    return res.status(HTTP_CODES.NOT_FOUND).send({})
  } catch (error) {
    console.error(error)
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
    await deleteLinkedIngredient(Number(req.params.id))

    return res.status(HTTP_CODES.OK).send({})
  } catch (error) {
    console.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

export default router
