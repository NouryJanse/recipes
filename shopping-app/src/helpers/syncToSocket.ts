import { getSocket } from "../components/ShoppingList/getSocket";
import type { TypeShoppingItem } from "../services/types.db";
import { getLocalStorageObject } from "./updateLocalStorage";

export const syncToSocket = (updatedList: TypeShoppingItem[]) => {
  const socket = getSocket();

  // @TODO: implement storage for ingredients and recipes here!
  socket.emit("listUpdate", getLocalStorageObject(updatedList));
};
