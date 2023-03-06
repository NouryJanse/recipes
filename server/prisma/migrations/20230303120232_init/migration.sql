-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_recipeId_fkey";

-- AlterTable
ALTER TABLE "RecipeIngredients" ADD COLUMN     "description" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
