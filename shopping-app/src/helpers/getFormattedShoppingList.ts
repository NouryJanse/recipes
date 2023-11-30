import type { TypeShoppingItem } from "../services/types.db";

const getFormattedShoppingList = (id: string, list: TypeShoppingItem[]) => {
  return JSON.stringify({ _id: id, updatedAt: `${new Date().toISOString()}`, list });
};

export default getFormattedShoppingList;
