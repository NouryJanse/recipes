import { useEffect, useState } from "preact/hooks";
import { $socketClient, setShoppingList, setShoppingListRecipes } from "../../services/store";
import { getSocket } from "./getSocket";
import { useStore } from "@nanostores/preact";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socket = useStore($socketClient);

  useEffect(() => {
    getSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg: any) => {
        console.info(msg);
      });

      socket.on("connect", () => {
        console.info("connected");
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.info("disconnected");
        setIsConnected(false);
      });

      socket.on("onShoppingListUpdate", (data: any) => {
        const { shoppingList, recipesList } = JSON.parse(data);
        if (shoppingList && recipesList) {
          setShoppingList(shoppingList);
          setShoppingListRecipes(recipesList);
        }
      });

      return () => {
        isConnected;
        socket.off("connect");
        socket.off("disconnect");
        socket.off("onShoppingListUpdate");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket && socket.connected) {
      setIsConnected(socket.connected);
    }
  }, [socket]);

  return { isConnected };
};
