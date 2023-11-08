import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import io from "socket.io-client";

import type { TypeShoppingItem } from "../../services/types.db";
import deleteObjectWithIdFromArray from "../../../helpers/deleteObjectWithIdFromArray";
import updateArrayWithObjectById from "../../../helpers/updateArrayWithObjectById";
import getFormattedShoppingList from "../../../helpers/getFormattedShoppingList";

import CreateShoppingItem from "../CreateShoppingItem";
import ShoppingItems from "../ShoppingItems";
import sortShoppingListOnDate from "../../../helpers/sortShoppingListOnDate";

const SOCKET_API_URL = import.meta.env.PUBLIC_SOCKET_API_URL as string;
const socket = io(SOCKET_API_URL, {});

type ShoppingListProps = {
  dbShoppingList: any;
};

const ShoppingList: FunctionComponent<ShoppingListProps> = ({ dbShoppingList }) => {
  const [list, setList] = useState<TypeShoppingItem[]>([]);
  const [dialogOpened, setDialogOpened] = useState(false);

  useEffect(() => {
    // socket.on("connect", () => {
    //   // setIsConnected(true);
    // });
    // socket.on("disconnect", () => {
    //   // setIsConnected(false);
    // });
    socket.on("onShoppingListUpdate", (data) => {
      const parsedData = JSON.parse(data);
      setList(parsedData.list);
      updateLocalStorage(parsedData.list);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("shoppingList");
    if (data) {
      const localShoppingList = JSON.parse(data);
      // setList(localShoppingList.list);

      if (dbShoppingList.updatedAt > localShoppingList.updatedAt) {
        // db version is newer
        setList(dbShoppingList.list);
        updateLocalStorage(dbShoppingList.list);
      } else {
        // localStorage is newer
        setList(localShoppingList.list);
      }
    } else if (dbShoppingList.list.length) {
      setList(dbShoppingList.list);
      updateLocalStorage(dbShoppingList.list);
    } else {
      // new user with no data
    }
  }, [dbShoppingList]);

  const updateLocalStorage = (updatedList: TypeShoppingItem[]) => {
    localStorage.setItem("shoppingList", getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList));
  };

  const syncToSocket = (updatedList: TypeShoppingItem[]) => {
    const body = getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList);
    socket.emit("listUpdate", body);
    // todo broadcast to everyone but self
    // socket.emit("onShoppingListUpdate", body);
  };

  const onAdd = (items: TypeShoppingItem[]): void => {
    // const updatedList = sortShoppingListOnDate(list);
    setList(items);
    updateLocalStorage(items);
    syncToSocket(items);
  };

  const onEdit = () => {
    setDialogOpened(true);
  };

  const onUpdate = (item: TypeShoppingItem): void => {
    const updatedList = updateArrayWithObjectById(list, item);
    setList(updatedList);
    updateLocalStorage(updatedList);
    syncToSocket(updatedList);
  };

  const onDelete = (itemId: string): void => {
    const updatedList = deleteObjectWithIdFromArray(list, itemId);
    setList(updatedList);
    updateLocalStorage(updatedList);
    syncToSocket(updatedList);
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <CreateShoppingItem list={list} onAdd={onAdd} />
      <dialog open={dialogOpened} onClose={() => setDialogOpened(false)}>
        <p>Greetings, one and all!</p>

        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
      <br />
      <br />
      <br />
      <br />
      <ShoppingItems list={list} onUpdate={onUpdate} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default ShoppingList;
