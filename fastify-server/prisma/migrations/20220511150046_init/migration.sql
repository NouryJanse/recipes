/*
  Warnings:

  - A unique constraint covering the columns `[cloudinaryImageId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cloudinaryImageId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "cloudinaryImageId" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_cloudinaryImageId_key" ON "Image"("cloudinaryImageId");
