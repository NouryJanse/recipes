import { PrismaClient, Image } from "@prisma/client";
const cloudinary = require("cloudinary").v2;

const prisma = new PrismaClient();

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_ID,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
} catch (error) {
  console.error(error);
}

const deleteImage = async (cloudinaryPublicId: string): Promise<Image | false> => {
  try {
    await cloudinary.uploader.destroy(
      cloudinaryPublicId,
      { upload_preset: process.env.CLOUDINARY_PRESET_ID },
      (error: string, result: any) => {
        // logger.error(result, error);
      }
    );

    const dbImage: Image = await prisma.image.delete({
      where: { cloudinaryPublicId },
    });

    return dbImage;
  } catch (error) {
    // LOG ERROR
    return false;
  } finally {
    async (): Promise<void> => {
      await prisma.$disconnect();
    };
  }
};

export default deleteImage;
