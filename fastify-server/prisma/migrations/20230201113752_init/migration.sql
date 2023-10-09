/*
  Warnings:

  - You are about to drop the column `unit` on the `RecipeIngredients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "unit" VARCHAR(255);

-- AlterTable
ALTER TABLE "RecipeIngredients" DROP COLUMN "unit";
