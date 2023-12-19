import { useEffect, useState } from "preact/hooks";
import { $socketClient, setShoppingList, setSocket } from "../../services/store";
import { getSocket } from "./getSocket";
import { useStore } from "@nanostores/preact";

export const useActivateSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socket = useStore($socketClient);

  useEffect(() => {
    getSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      // if (!socket.connected) {
      //   socket.connect();
      // }
      socket.on("message", (msg: any) => {
        console.log(msg);
      });

      socket.on("connect", () => {
        console.log("connected");
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
        setIsConnected(false);
      });

      socket.on("onShoppingListUpdate", (data: any) => {
        const parsedData = JSON.parse(data);
        setShoppingList(parsedData.list);
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
