import deleteObjectWithIdFromArray from "../../helpers/deleteObjectWithIdFromArray";
import updateArrayWithObjectById from "../../helpers/updateArrayWithObjectById";
import { $shoppingList, setShoppingList, setModalShoppingItem } from "../../services/store";
import type { TypeShoppingItem } from "../../services/types.db";
import { syncToSocket, updateLocalStorage } from "../ShoppingList/helpers";

export const onUpdate = (item: TypeShoppingItem): void => {
  const updatedList = updateArrayWithObjectById($shoppingList.get(), item);
  setShoppingList(updatedList);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

export const onDelete = (itemId: string): void => {
  const updatedList = deleteObjectWithIdFromArray($shoppingList.get(), itemId);
  setShoppingList(updatedList);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

export const onEdit = (shoppingItem: TypeShoppingItem) => {
  setModalShoppingItem(shoppingItem);
};
