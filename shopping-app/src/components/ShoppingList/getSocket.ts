import { io } from "socket.io-client";

const getSomeEnvVariable = () => {
  return import.meta.env.PUBLIC_SOCKET_API_URL
    ? import.meta.env.PUBLIC_SOCKET_API_URL
    : process.env.PUBLIC_SOCKET_API_URL
      ? process.env.PUBLIC_SOCKET_API_URL
      : "https://shopping-server-iggv.onrender.com";
};

export const getSocket = () => {
  const SOCKET_API_URL = getSomeEnvVariable() as string;
  return io(SOCKET_API_URL, { autoConnect: false });
};
