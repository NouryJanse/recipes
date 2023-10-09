-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredients" DROP CONSTRAINT "RecipeIngredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredients" DROP CONSTRAINT "RecipeIngredients_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredients" ADD CONSTRAINT "RecipeIngredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredients" ADD CONSTRAINT "RecipeIngredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
