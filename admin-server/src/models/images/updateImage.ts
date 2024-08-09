import { PrismaClient, Image } from '@prisma/client'

const prisma = new PrismaClient()

const updateImage = async (image: Image): Promise<Image> => {
    try {
        const dbImage: Image = await prisma.image.update({
            where: { cloudinaryPublicId: image.cloudinaryPublicId },
            data: {
                ...(image.position && { position: image.position }),
            },
        })

        return dbImage
    } catch (error) {
        throw error
    } finally {
        ;async (): Promise<void> => {
            await prisma.$disconnect()
        }
    }
}

export default updateImage
