import { io } from "socket.io-client";
import { setSocket } from "../../services/store";

const getSomeEnvVariable = () => {
  return import.meta.env.PUBLIC_SOCKET_API_URL
    ? import.meta.env.PUBLIC_SOCKET_API_URL
    : process.env.PUBLIC_SOCKET_API_URL
      ? process.env.PUBLIC_SOCKET_API_URL
      : "https://shopping-server-iggv.onrender.com";
};

export const getSocket = () => {
  try {
    const SOCKET_API_URL = getSomeEnvVariable() as string;
    const socket = io(SOCKET_API_URL, { autoConnect: false });
    setSocket(socket);
  } catch (error) {
    console.error(error)
  }
};
