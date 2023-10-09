/*
  Warnings:

  - Added the required column `amount` to the `RecipeIngredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `RecipeIngredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeIngredients" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "unit" VARCHAR(255) NOT NULL;
