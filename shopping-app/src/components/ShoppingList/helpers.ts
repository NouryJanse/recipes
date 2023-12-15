import getFormattedShoppingList from "../../helpers/getFormattedShoppingList";
import type { TypeShoppingItem } from "../../services/types.db";
import { setShoppingList } from "../../services/store";
import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";
import { getSocket } from "./getSocket";

export const syncToSocket = (updatedList: TypeShoppingItem[]) => {
  const body = getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList);
  const socket = getSocket();
  socket.emit("listUpdate", body);
};

export const updateLocalStorage = (updatedList: TypeShoppingItem[]) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    localStorage.setItem("shoppingList", getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList));
  }
};

export const checkForExistingShoppingList = (dbShoppingList: any) => {
  const data = localStorage.getItem("shoppingList");
  if (data) {
    const localShoppingList = JSON.parse(data);

    if (dbShoppingList.updatedAt > localShoppingList.updatedAt) {
      // db version is newer
      const sorted = sortShoppingListOnDate(dbShoppingList.list);
      updateLocalStorage(sorted);
      setShoppingList(sorted);
    } else {
      // localStorage is newer
      const sorted = sortShoppingListOnDate(localShoppingList.list);
      setShoppingList(sorted);
    }
  } else if (dbShoppingList.list.length) {
    updateLocalStorage(dbShoppingList.list);
    setShoppingList(dbShoppingList.list);
  } else {
    // new user with no data
  }
};
