import { $shoppingList, setShoppingList, setModalShoppingItem } from "../../services/store";

import deleteObjectWithIdFromArray from "../../helpers/deleteObjectWithIdFromArray";
import updateArrayWithObjectById from "../../helpers/updateArrayWithObjectById";

import type { TypeShoppingItem } from "../../services/types.db";
import { syncToSocket } from "../../helpers/syncToSocket";

export const onUpdate = (item: TypeShoppingItem): void => {
  const updatedList = updateArrayWithObjectById($shoppingList.get(), item);
  setShoppingList(updatedList);
  syncToSocket(updatedList);
};

export const onDelete = (itemId: string): void => {
  const updatedList = deleteObjectWithIdFromArray($shoppingList.get(), itemId);
  setShoppingList(updatedList);
  syncToSocket(updatedList);
};

export const onEdit = (shoppingItem: TypeShoppingItem) => {
  setModalShoppingItem(shoppingItem);
};
