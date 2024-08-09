import { $socketClient, getUser } from "../services/store";
import { formatLocalStorageObject } from "./updateLocalStorage";

export const syncToSocket = () => {
  const user = getUser();
  if (user?.id && $socketClient) {
    $socketClient.get().emit("listUpdate", formatLocalStorageObject(user.id));
  }
};
