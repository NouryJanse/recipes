import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import fp from 'fastify-plugin'
import {
  getIngredientsOps,
  createIngredientOps,
  getIngredientOps,
  deleteIngredientOps,
  updateIngredientOps,
  linkIngredientToRecipeOps,
} from '../../controllers/ingredients/'
import updateRecipeIngredientOps from '../../controllers/ingredients/updateRecipeIngredientOps'

export default fp(
  (
    server: FastifyInstance,
    _opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void => {
    // CREATE INGREDIENT
    server.post('/api/ingredients', {
      handler: createIngredientOps,
      preValidation: server.authenticate,
    })

    // GET INGREDIENTS
    server.get('/api/ingredients', { handler: getIngredientsOps })

    // GET RECIPE
    server.get('/api/ingredients/:id', {
      handler: getIngredientOps,
    })

    // UPDATE RECIPE
    server.put('/api/ingredients/:id', {
      handler: updateIngredientOps,
      preValidation: server.authenticate,
    })

    // DELETE RECIPE
    server.delete('/api/ingredients/:id', {
      handler: deleteIngredientOps,
      preValidation: server.authenticate,
    })

    /*
     * RECIPE INGREDIENTS
     */

    // LINK INGREDIENT TO RECIPE
    server.post('/api/ingredients/recipe', {
      handler: linkIngredientToRecipeOps,
      preValidation: server.authenticate,
    })

    // UPDATE INGREDIENT RECIPE LINK
    server.put('/api/ingredients/recipe/:id', {
      handler: updateRecipeIngredientOps,
      preValidation: server.authenticate,
    })

    // update, delete linked ingredient

    next()
  },
)
