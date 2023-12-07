import express from 'express'
import { Recipe } from '@prisma/client'
import { getRecipe } from '../../models/recipes'
// import ObjectAlreadyExistsError from "../../types/ObjectAlreadyExistsError";
import { formatRecipeImages } from '../../helpers'
import { HTTP_CODES } from '../../constants'

const router = express.Router()

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

export default router
