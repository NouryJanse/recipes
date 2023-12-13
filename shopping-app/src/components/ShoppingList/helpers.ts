import io from "socket.io-client";
import getFormattedShoppingList from "../../helpers/getFormattedShoppingList";
import type { TypeShoppingItem } from "../../services/types.db";
import { setShoppingList } from "../../services/store";
import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";
import { useEffect, useState } from "preact/hooks";

const getSomeEnvVariable = () => {
  return import.meta.env.PUBLIC_SOCKET_API_URL
    ? import.meta.env.PUBLIC_SOCKET_API_URL
    : process.env.PUBLIC_SOCKET_API_URL
      ? process.env.PUBLIC_SOCKET_API_URL
      : "https://shopping-server-iggv.onrender.com";
};

const SOCKET_API_URL = getSomeEnvVariable() as string;
const socket = io(SOCKET_API_URL, { autoConnect: false });

export const syncToSocket = (updatedList: TypeShoppingItem[]) => {
  const body = getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList);
  socket.emit("listUpdate", body);
};

export const activateSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("onShoppingListUpdate", (data) => {
      const parsedData = JSON.parse(data);
      setShoppingList(parsedData.list);
      updateLocalStorage(parsedData.list);
    });
    return () => {
      isConnected;
      socket.off("connect");
      socket.off("disconnect");
      socket.off("onShoppingListUpdate");
      // socket.off("message");
    };
  }, []);

  return { isConnected };
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
