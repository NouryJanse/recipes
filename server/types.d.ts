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
