/*
  Warnings:

  - You are about to drop the column `cloudinaryImageId` on the `Image` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Image_cloudinaryImageId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "cloudinaryImageId";
