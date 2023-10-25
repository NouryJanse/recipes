import { useLoaderData } from "@remix-run/react";
import { Ingredient, Option } from "@nouryjanse/recipe-types";
import { useHydrated } from "~/components/useHydrated";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import AddIngredient from "~/components/AddIngredient";
import { mongodb } from "~/services/db";
import sortShoppingListOnDate from "~/helpers/sortShoppingListOnDate";
import deleteObjectWithIdFromArray from "~/helpers/deleteObjectWithIdFromArray";
import updateArrayWithObjectById from "~/helpers/updateArrayWithObjectById";
import getFormattedShoppingList from "~/helpers/getFormattedShoppingList";
import { TypeShoppingItem } from "~/services/types.db";
import fetchURL from "~/helpers/fetchURL";
import Sidebar from "~/components/Sidebar";

const socket = io("localhost:1234", {});

export async function loader() {
  const API_URL: string = process.env.API_URL as string;
  const DB_NAME: string = process.env.DB_NAME as string;
  const COLLECTION_NAME: string = process.env.COLLECTION_NAME as string;

  let db = await mongodb.db(DB_NAME);
  let collection = await db.collection(COLLECTION_NAME);
  let response = await collection.find({}).limit(10).toArray();
  const dbShoppingList = response[0];

  const data: any = await fetchURL(`${API_URL}/ingredients`);
  const ingredients = await data.json();
  const ingredientOptions = ingredients.map((ingredient: Ingredient): Option => {
    return {
      id: ingredient.id,
      disabled: false,
      value: ingredient.id ? ingredient.id.toString() : "",
      label: ingredient.name ? ingredient.name : "",
    };
  });

  return { ingredients, ingredientOptions, dbShoppingList };
}

export default function Index() {
  const isHydrated = useHydrated();
  const { ingredients, ingredientOptions, dbShoppingList } = useLoaderData<typeof loader>();
  const [list, setList] = useState<TypeShoppingItem[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      // setIsConnected(true);
    });
    socket.on("disconnect", () => {
      // setIsConnected(false);
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

  const syncToSocket = (updatedList: TypeShoppingItem[]) => {
    const body = getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList);
    socket.emit("listUpdate", body);
    // todo broadcast to everyone but self
    // socket.emit("onShoppingListUpdate", body);
  };

  const updateLocalStorage = (updatedList: TypeShoppingItem[]) => {
    localStorage.setItem("shoppingList", getFormattedShoppingList("652ffe8d262c73d000bcfd9a", updatedList));
  };

  useEffect(() => {
    const data = localStorage.getItem("shoppingList");
    if (data) {
      const localShoppingList = JSON.parse(data);
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
  }, []);

  const onAdd = (items: TypeShoppingItem[]): void => {
    const updatedList = sortShoppingListOnDate(items);
    setList(updatedList);
    updateLocalStorage(updatedList);
    syncToSocket(updatedList);
  };

  const onDelete = (itemId: number): void => {
    const updatedList = deleteObjectWithIdFromArray(list, itemId);
    setList(updatedList);
    updateLocalStorage(updatedList);
    syncToSocket(updatedList);
  };

  const onUpdate = (item: TypeShoppingItem): void => {
    const updatedList = updateArrayWithObjectById(list, item);
    setList(updatedList);
    updateLocalStorage(updatedList);
    syncToSocket(updatedList);
  };

  return (
    <div className="flex flex-col md:flex-row max-h-screen min-w-full justify-between">
      <div className="flex justify-center items-start lg:items-center pt-16 lg:pt-0 mb-4 mx-4">
        {isHydrated ? (
          <AddIngredient ingredientOptions={ingredientOptions} ingredients={ingredients} list={list} onAdd={onAdd} />
        ) : null}
      </div>

      <Sidebar list={list} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
}
