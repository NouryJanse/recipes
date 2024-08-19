interface Recipe {
    // id: number;
    // name?: string;
    // description?: string;
    // authorId: string;
    // course?: string;
    // createdAt: Date | null;
    // updatedAt: Date | null;
    // published: boolean;
    createdAt: string
    updatedAt: string
    id: number
    name: string
    description: string | null
    published: boolean | null
    authorId: number | null
    course: string
    cookingDuration: number | null
    rating: number | null
    difficultyRating: number | null
    calorieCount: number | null
    numberOfPersons: number
    images?: Image[]
    ingredients: RecipeIngredient[]
}
interface Ingredient {
    id: number
    name?: string
    unit: string
    published: boolean
    calorieCount: number
    createdAt: string
    updatedAt: string
    amount: number
}

type RecipeIngredient = {
    id: number
    authorId: string
    recipeId: number
    ingredientId?: number
    name?: string
    amount?: number
    unit?: string
}
