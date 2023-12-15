interface Recipe {
  id: number;
  name?: string;
  description?: string;
  authorId: string;
  course?: string;
  createdAt: string;
  updatedAt: string;
  images?: Image[];
  ingredients: RecipeIngredient[];
  published: boolean;
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
