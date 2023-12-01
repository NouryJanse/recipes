import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import io from "socket.io-client";

// data
import { $list, $modalShoppingItem, $user, setModalShoppingItem, setShoppingList } from "../../services/store";
import { useStore } from "@nanostores/preact";

// helpers
import type { TypeShoppingItem, User } from "../../services/types.db";
import deleteObjectWithIdFromArray from "../../helpers/deleteObjectWithIdFromArray";
import updateArrayWithObjectById from "../../helpers/updateArrayWithObjectById";
import getFormattedShoppingList from "../../helpers/getFormattedShoppingList";
import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";

// UI
import CreateShoppingItemModal, { type FormStateType } from "../CreateShoppingItemModal";
import ShoppingItems from "../ShoppingItems";
import Button from "../Form/Button";

const SOCKET_API_URL = import.meta.env.PUBLIC_SOCKET_API_URL as string;
const socket = io(SOCKET_API_URL, {});

type ShoppingListProps = {
  dbShoppingList: any;
};

const ShoppingList: FunctionComponent<ShoppingListProps> = ({ dbShoppingList }) => {
  const list = useStore($list);
  const [dialogOpened, setDialogOpened] = useState(false);
  const modalShoppingItem = useStore($modalShoppingItem);

  useEffect(() => {
    activateSocket();
    checkForExistingShoppingList(dbShoppingList);
  }, []);

  useEffect(() => {
    if (modalShoppingItem) {
      setModalShoppingItem(modalShoppingItem);
      setDialogOpened(true);
    } else {
      setDialogOpened(false);
    }
  }, [modalShoppingItem]);

  return (
    <div className="shopping--items">
      <CreateShoppingItemModal
        isOpen={dialogOpened}
        onClose={() => {
          setDialogOpened(false);
          setModalShoppingItem(undefined);
        }}
        editedShoppingItem={modalShoppingItem}
      />

      <div className="ingredientsTitleContainer">
        <h3>Ingredients</h3>
        <Button type="button" style="secondary" onClick={() => setDialogOpened(true)}>
          Add another
        </Button>
      </div>

      <ShoppingItems list={list} onUpdate={onUpdate} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export const syncToSocket = (updatedList: TypeShoppingItem[]) => {
  const body = getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList);
  socket.emit("listUpdate", body);
};

const activateSocket = () => {
  // socket.on("connect", () => {});
  // socket.on("disconnect", () => {});
  // socket.on("message", (msg) => {
  //   console.log(msg);
  // });
  socket.on("onShoppingListUpdate", (data) => {
    const parsedData = JSON.parse(data);
    setShoppingList(parsedData.list);
    updateLocalStorage(parsedData.list);
  });
  return () => {
    // comments here for debugging purposes
    // socket.off("connect");
    // socket.off("disconnect");
    // socket.off("message");
    socket.off("onShoppingListUpdate");
  };
};

export const updateLocalStorage = (updatedList: TypeShoppingItem[]) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    localStorage.setItem("shoppingList", getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList));
  }
};

const checkForExistingShoppingList = (dbShoppingList: any) => {
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

const onUpdate = (item: TypeShoppingItem): void => {
  const updatedList = updateArrayWithObjectById($list.get(), item);
  setShoppingList(updatedList);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

const onDelete = (itemId: string): void => {
  const updatedList = deleteObjectWithIdFromArray($list.get(), itemId);
  setShoppingList(updatedList);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

const onEdit = (shoppingItem: FormStateType) => {
  setModalShoppingItem(shoppingItem);
};

export default ShoppingList;
