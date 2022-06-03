import { Image } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import { HTTP_CODES } from '../../constants'
import { createImage, deleteImage } from '../../models/images'

const createRecipeImageOps = async (
  request: FastifyRequest<{ Body: any; Params: FastifyRecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  const recipeId = +request.params.id
  if (request.body.image.data) {
    const image: Image | false = await createImage(request.log, request.body.image.data, recipeId)
    if (image) {
      return reply.code(HTTP_CODES.CREATED).send(image)
    }
  }

  request.log.error('An error occurred')
  return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
}

const deleteRecipeImageOps = async (
  request: FastifyRequest<{ Body: { cloudinaryPublicId: string }; Params: FastifyRecipeParams }>,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    // improve the cache by deleting the recipe instance of that relates to this image - instead of all recipes
    const cache = request.serverCache()
    if (cache) {
      cache.del('recipes')
    }

    const { cloudinaryPublicId } = request.body
    await deleteImage(request.log, cloudinaryPublicId)

    return reply.code(HTTP_CODES.OK).send({})
  } catch (error) {
    request.log.error('An error occurred')
    return reply.code(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
}

export default {
  createRecipeImageOps,
  deleteRecipeImageOps,
}
