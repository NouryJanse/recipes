-- DropForeignKey
ALTER TABLE "RecipeIngredients" DROP CONSTRAINT "RecipeIngredients_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "RecipeIngredients" ADD CONSTRAINT "RecipeIngredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
