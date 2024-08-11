import express, { Request, Response } from 'express'
import { HTTP_CODES } from '../../constants'
import { getRecipes } from '../../models/recipes'

const router = express.Router()

// GET RECIPES
router.get('/api/recipes', async (req: Request, res: Response) => {
    try {
        const recipes = await getRecipes(undefined)
        res.status(200).send(recipes)
    } catch (error) {
        console.error(error)
        return res.status(HTTP_CODES.NOT_FOUND).send([])
    }
})

export default router
