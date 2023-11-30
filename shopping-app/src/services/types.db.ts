import type { WithId, Document } from "mongodb";

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

export interface User {
  id: number;
}
