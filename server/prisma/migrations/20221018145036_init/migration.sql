-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "published" BOOLEAN DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
