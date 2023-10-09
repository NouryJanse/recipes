/*
  Warnings:

  - A unique constraint covering the columns `[cloudinaryId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cloudinaryId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "cloudinaryId" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_cloudinaryId_key" ON "Image"("cloudinaryId");
