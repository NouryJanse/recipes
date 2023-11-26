import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import io from "socket.io-client";

import type { TypeShoppingItem } from "../../services/types.db";
import deleteObjectWithIdFromArray from "../../../helpers/deleteObjectWithIdFromArray";
import updateArrayWithObjectById from "../../../helpers/updateArrayWithObjectById";
import getFormattedShoppingList from "../../../helpers/getFormattedShoppingList";

import CreateShoppingItemModal from "../CreateShoppingItemModal";
import ShoppingItems from "../ShoppingItems";
import sortShoppingListOnDate from "../../../helpers/sortShoppingListOnDate";
import SeasonalVeggieList, { SeasonalProducts } from "../SeasonalVeggieList";

const SOCKET_API_URL = import.meta.env.PUBLIC_SOCKET_API_URL as string;
const socket = io(SOCKET_API_URL, {});

type ShoppingListProps = {
  dbShoppingList: any;
};

const ShoppingList: FunctionComponent<ShoppingListProps> = ({ dbShoppingList }) => {
  const [list, setList] = useState<TypeShoppingItem[]>([]);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [editedShoppingItem, setEditedShoppingItem] = useState<TypeShoppingItem>();

  useEffect(() => {
    // socket.on("connect", () => {});
    // socket.on("disconnect", () => {});
    socket.on("message", (msg) => {
      console.log(msg);
    });
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

      if (dbShoppingList.updatedAt > localShoppingList.updatedAt) {
        // db version is newer
        const sorted = sortShoppingListOnDate(dbShoppingList.list);
        setList(sorted);
        updateLocalStorage(sorted);
      } else {
        // localStorage is newer
        const sorted = sortShoppingListOnDate(localShoppingList.list);
        setList(sorted);
      }
    } else if (dbShoppingList.list.length) {
      setList(dbShoppingList.list);
      updateLocalStorage(dbShoppingList.list);
    } else {
      // new user with no data
    }
  }, [dbShoppingList]);

  const onAdd = (items: TypeShoppingItem[]): void => {
    const updatedList = sortShoppingListOnDate(items);
    setList(updatedList);
    updateLocalStorage(updatedList);
    syncToSocket(updatedList);
  };

  const onEdit = (shoppingItem: TypeShoppingItem) => {
    setEditedShoppingItem(shoppingItem);
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
    <div className="container shopping--container">
      <div className="shoppping-list">
        <CreateShoppingItemModal
          list={list}
          onAdd={(items) => {
            setEditedShoppingItem(undefined);
            onAdd(items);
            setDialogOpened(false);
          }}
          isOpen={dialogOpened}
          onClose={() => {
            setDialogOpened(false);
            setEditedShoppingItem(undefined);
          }}
          editedShoppingItem={editedShoppingItem}
        />

        <div className="ingredientsTitleContainer">
          <h3>Ingredients</h3>
          <button className="attention" onClick={() => setDialogOpened(true)}>
            Add another
          </button>
        </div>

        <ShoppingItems list={list} onUpdate={onUpdate} onDelete={onDelete} onEdit={onEdit} />
      </div>
      <SeasonalProducts setDialogOpened={setDialogOpened} />
    </div>
  );
};

const updateLocalStorage = (updatedList: TypeShoppingItem[]) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    localStorage.setItem("shoppingList", getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList));
  }
};

const syncToSocket = (updatedList: TypeShoppingItem[]) => {
  const body = getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList);
  socket.emit("listUpdate", body);
};

export default ShoppingList;
