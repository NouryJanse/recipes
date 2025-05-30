import { PrismaClient, Image } from '@prisma/client'
import CloudinaryImage from '../../types/CloudinaryImage'

const cloudinary = require('cloudinary').v2
const prisma = new PrismaClient()

try {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_ID,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    })
} catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
}

const createImage = async (imageBase64: CloudinaryImage, recipeId: number): Promise<Image> => {
    try {
        const image = await cloudinary.uploader.upload(
            imageBase64,
            { upload_preset: process.env.CLOUDINARY_PRESET_ID },
            (error: string, result: any) => {
                console.error(error)
            },
        )

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
                position: 0,
                recipeId,
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

export default createImage
