import { Ingredient } from "@nouryjanse/recipe-types";
import type { WithId, Document } from "mongodb";

export interface TypeShoppingItem extends Ingredient {
  checked: boolean;
  unit: string;
}

export interface ShoppingList extends WithId<Document> {
  id: number;
  items: TypeShoppingItem[];
}
