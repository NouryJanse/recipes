import { $socketClient } from "../services/store";
import type { TypeShoppingItem } from "../services/types.db";
import { getLocalStorageObject } from "./updateLocalStorage";

export const syncToSocket = (updatedList: TypeShoppingItem[]) => {
  // @TODO: implement storage for ingredients and recipes here!
  $socketClient.get().emit("listUpdate", getLocalStorageObject(updatedList));
};
