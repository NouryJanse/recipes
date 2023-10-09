interface FastifyRecipeParams {
  id: string
}
interface FastifyIngredientParams {
  id: string
}

declare module '*.json' {
  const value: any
  export default value
}

interface CloudinaryImage {
  access_mode: string
  asset_id: string
  bytes: number
  created_at: Date
  etag: string
  folder: string
  format: string
  height: number
  pages: number
  placeholder: boolean
  public_id: string
  resource_type: string
  tags: []
  type: string
  url: string
  version: number
  version_id: string
  width: number
  position?: number
}

interface FastifyRecipeBody {
  name: string
  description: string
  authorId: number
  course: string
  images: []
  image: {
    data: CloudinaryImage
  }
}

interface FastifyIngredientBody {
  name: string
  unit: string
  calorieCount: number
  published: boolean
}

interface FastifyIngredientRecipeBody {
  recipeId: number
  ingredientId: number
  id?: number
  unit: string
  amount: number
}
