import { useEffect, useState } from "preact/hooks";
import { $socketClient, setShoppingList } from "../../services/store";

export const useActivateSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socket = $socketClient.get();

  useEffect(() => {
    socket.connect();
    socket.on("message", (msg: any) => {
      console.log(msg);
    });
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
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
  }, []);

  return { isConnected };
};
