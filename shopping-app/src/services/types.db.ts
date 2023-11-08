// import type Ingredient from "@nouryjanse/recipe-types";
import type { WithId, Document } from "mongodb";

// type Ingredient = typeof Ingredient;

export interface TypeShoppingItem {
  id: string;
  name?: string;
  ingredientName: string;
  checked: boolean;
  unit: string;
  amount: number;
  updatedAt: string;
}

export interface ShoppingList extends WithId<Document> {
  id: number;
  items: TypeShoppingItem[];
}
