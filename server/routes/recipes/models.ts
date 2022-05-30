import { PrismaClient, Image } from '@prisma/client'
import { FastifyLoggerInstance } from 'fastify'
const cloudinary = require('cloudinary').v2

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_ID,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
} catch (error) {
  console.error(error)
}

const prisma = new PrismaClient()

const saveImage = async (
  logger: FastifyLoggerInstance,
  imageBase64: CloudinaryImage,
  recipeId: number,
): Promise<Image | false> => {
  try {
    const image = await cloudinary.uploader.upload(
      imageBase64,
      { upload_preset: process.env.CLOUDINARY_PRESET_ID },
      (error: string, result: any) => {
        console.log(result, error)
      },
    )

    console.log(image)

    const dbImage: Image = await prisma.image.upsert({
      where: { cloudinaryPublicId: image.public_id },
      update: {
        ...(image.position && { position: image.position }),
        ...(image.url && { url: image.url }),
        ...(image.width && { width: image.width }),
        ...(image.height && { height: image.height }),
      },
      create: {
        url: image.url,
        ...(image.width && { width: image.width }),
        ...(image.height && { height: image.height }),
        cloudinaryPublicId: image.public_id,
        recipeId,
      },
    })

    return dbImage
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

const deleteImage = async (
  logger: FastifyLoggerInstance,
  cloudinaryPublicId: string,
): Promise<Image | false> => {
  try {
    const image = await cloudinary.uploader.destroy(
      cloudinaryPublicId,
      { upload_preset: process.env.CLOUDINARY_PRESET_ID },
      (error: string, result: any) => {
        console.log(result, error)
      },
    )

    const dbImage: Image = await prisma.image.delete({
      where: { cloudinaryPublicId },
    })

    return dbImage
  } catch (error) {
    logger.error(error)
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export { saveImage, deleteImage }
