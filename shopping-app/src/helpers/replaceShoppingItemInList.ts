import type { TypeShoppingItem } from "../services/types.db";

const replaceShoppingItemInList = (
  list: TypeShoppingItem[],
  editedShoppingItem: TypeShoppingItem,
  newShoppingItem: TypeShoppingItem
) => {
  return list.map((existingShoppingItem) => {
    return existingShoppingItem.id === editedShoppingItem.id ? newShoppingItem : existingShoppingItem;
  });
};

export default replaceShoppingItemInList;
