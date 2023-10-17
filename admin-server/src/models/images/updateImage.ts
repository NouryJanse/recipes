import { PrismaClient, Image } from '@prisma/client'

const prisma = new PrismaClient()

const updateImage = async (image: Image): Promise<Image | false> => {
  try {
    const dbImage: Image = await prisma.image.update({
      where: { cloudinaryPublicId: image.cloudinaryPublicId },
      data: {
        ...(image.position && { position: image.position }),
      },
    })

    return dbImage
  } catch (error) {
    // LOG ERROR
    return false
  } finally {
    ;async (): Promise<void> => {
      await prisma.$disconnect()
    }
  }
}

export default updateImage
