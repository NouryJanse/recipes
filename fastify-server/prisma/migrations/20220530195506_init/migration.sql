/*
  Warnings:

  - You are about to drop the column `cloudinaryId` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cloudinaryPublicId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cloudinaryPublicId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Image_cloudinaryId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "cloudinaryId",
ADD COLUMN     "cloudinaryPublicId" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "calorieCount" INTEGER;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "calorieCount" INTEGER,
ADD COLUMN     "cookingDuration" INTEGER,
ADD COLUMN     "difficultyRating" INTEGER,
ADD COLUMN     "rating" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Image_cloudinaryPublicId_key" ON "Image"("cloudinaryPublicId");
