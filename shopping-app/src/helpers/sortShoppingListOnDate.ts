import type { TypeShoppingItem } from "../services/types.db";

const sortShoppingListOnDate = (shoppingList: TypeShoppingItem[]) => {
  if (!shoppingList || !shoppingList.length) return [];
  return shoppingList.sort((a: TypeShoppingItem, b: TypeShoppingItem) => {
    if (a.updatedAt < b.updatedAt) return 1;
    return -1;
  });
};

export default sortShoppingListOnDate;
