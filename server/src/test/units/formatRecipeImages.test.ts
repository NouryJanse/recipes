import { Recipe } from '@prisma/client'
import { formatRecipeImages } from '../../helpers'
import recipes from './mocks/formatRecipeImages.mock'

describe('formatRecipeImages', () => {
  it('checks if formatRecipeImages removes the Image: [] and replaces it with images: []', async () => {
    expect(recipes[0]).toHaveProperty('Image')
    expect(recipes.length).toBe(3)
    const formattedRecipes: Recipe[] = formatRecipeImages(recipes as Recipe[])
    expect(formattedRecipes[0]).not.toHaveProperty('Image')
    expect(formattedRecipes[0]).toHaveProperty('images')
    expect(formattedRecipes.length).toBe(3)
  })
})
