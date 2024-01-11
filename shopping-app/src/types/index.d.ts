interface Recipe {
  // id: number;
  // name?: string;
  // description?: string;
  // authorId: string;
  // course?: string;
  // createdAt: string;
  // updatedAt: string;
  // published: boolean;
  id: number;
  name: string;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  published: boolean | null;
  authorId: number | null;
  course: string;
  cookingDuration: number | null;
  rating: number | null;
  difficultyRating: number | null;
  calorieCount: number | null;
  numberOfPersons: number;
  images?: Image[];
  ingredients: RecipeIngredient[];
}
interface Ingredient {
  id: number;
  name?: string;
  unit: string;
  published: boolean;
  calorieCount: number;
  createdAt: string;
  updatedAt: string;
  amount: number;
}

type RecipeIngredient = {
  id: number;
  authorId: string;
  recipeId: number;
  ingredientId?: number;
  name?: string;
  amount?: number;
  unit?: string;
};
