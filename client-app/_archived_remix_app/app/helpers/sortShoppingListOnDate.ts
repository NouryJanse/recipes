import { TypeShoppingItem } from "~/services/types.db";

const sortShoppingListOnDate = (shoppingList: TypeShoppingItem[]) => {
  if (!shoppingList || !shoppingList.length) return [];
  return shoppingList.sort((a: TypeShoppingItem, b: TypeShoppingItem) => {
    if (a.createdAt < b.createdAt) return 1;
    return -1;
  });
};

export default sortShoppingListOnDate;
