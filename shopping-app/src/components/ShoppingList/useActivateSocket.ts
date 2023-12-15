import { useEffect, useState } from "preact/hooks";
import { setShoppingList } from "../../services/store";
import { updateLocalStorage } from "./helpers";

import { getSocket } from "./getSocket";

export const useActivateSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socket = getSocket();

  useEffect(() => {
    socket.connect();
    socket.on("message", (msg) => {
      console.log(msg);
    });
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
    };
  }, []);

  return { isConnected };
};
