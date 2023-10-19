import { useLoaderData } from "@remix-run/react";
import fetchIngredients from "~/helpers/fetchIngredients";
import { Ingredient, Option } from "@nouryjanse/recipe-types";
import { useHydrated } from "~/components/useHydrated";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ShoppingItem from "~/components/ShoppingItem";
import AddIngredient from "~/components/AddIngredient";
import { mongodb } from "~/services/db";
import sortShoppingListOnDate from "~/helpers/sortShoppingListOnDate";
import deleteObjectWithIdFromArray from "~/helpers/deleteObjectWithIdFromArray";
import updateArrayWithObjectById from "~/helpers/updateArrayWithObjectById";
import getFormattedShoppingList from "~/helpers/getFormattedShoppingList";
import { TypeShoppingItem } from "~/services/types.db";

const socket = io("localhost:1234", {});

export async function loader() {
  // console.log(process.env.SOME_SECRET);
  const API_URL: string = process.env.API_URL as string;
  const DB_NAME: string = process.env.DB_NAME as string;
  const COLLECTION_NAME: string = process.env.COLLECTION_NAME as string;

  let db = await mongodb.db(DB_NAME);
  let collection = await db.collection(COLLECTION_NAME);
  let response = await collection.find({}).limit(10).toArray();
  const dbShoppingList = response[0];

  const data: any = await fetchIngredients(`${API_URL}/ingredients`);
  const recipes: any = await fetchIngredients(`${API_URL}/recipes`);
  const recipesData = await recipes.json();
  console.log(recipesData);

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
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
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
    <div id="index-page">
      {isHydrated ? (
        <AddIngredient ingredientOptions={ingredientOptions} ingredients={ingredients} list={list} onAdd={onAdd} />
      ) : null}

      <div className="mb-16">
        {list && list.length > 0 && (
          <>
            <span className="flex mb-4">
              There {list.length === 1 ? `is ${list.length} item` : `are ${list.length} items`} in your list
            </span>

            {sortShoppingListOnDate(list).map((i: TypeShoppingItem) => {
              return i.checked === false || i.checked === undefined ? (
                <ShoppingItem key={i.id} shoppingItem={i} onDelete={onDelete} onUpdate={onUpdate} />
              ) : null;
            })}

            {sortShoppingListOnDate(list).map((i: TypeShoppingItem) => {
              return i.checked === true ? (
                <ShoppingItem key={i.id} shoppingItem={i} onDelete={onDelete} onUpdate={onUpdate} />
              ) : null;
            })}
          </>
        )}
      </div>
    </div>
  );
}
