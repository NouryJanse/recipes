import { useLoaderData } from "@remix-run/react";
import fetchIngredients from "~/helpers/fetchIngredients";
import { Ingredient, Option } from "@nouryjanse/recipe-types";
import { useHydrated } from "~/components/useHydrated";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ShoppingItem from "~/components/ShoppingItem";
import AddIngredient from "~/components/AddIngredient";

const socket = io("localhost:1234", {});

export async function loader() {
  // console.log(process.env.SOME_SECRET);
  const API_URL: string = process.env.API_URL as string;
  const data: any = await fetchIngredients(API_URL);
  const ingredients = await data.json();
  const ingredientOptions = ingredients.map((ingredient: Ingredient): Option => {
    return {
      id: ingredient.id,
      disabled: false,
      value: ingredient.id ? ingredient.id.toString() : "",
      label: ingredient.name ? ingredient.name : "",
    };
  });

  return { ingredients, ingredientOptions };
}

export default function Index() {
  const isHydrated = useHydrated();
  const { ingredients, ingredientOptions } = useLoaderData<typeof loader>();
  const [list, setList] = useState<Ingredient[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("message", (data) => {
      setLastMessage(data);
    });
    socket.on("firstTimeLoad", (data) => {
      setList(data);
    });
    socket.on("onShoppingListUpdate", (data) => {
      setList(data);
      if (!firstTime) {
        localStorage.setItem("shoppingList", JSON.stringify(data));
      }
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
      setFirstTime(false);
      const shoppingList = JSON.parse(data);
      setList(shoppingList);
    }
    if (firstTime) {
      setFirstTime(false);
      socket.emit("firstTimeLoad");
    }
  }, []);

  const emitSocket = (type: string, updatedList: Ingredient[]) => {
    socket.emit(type, updatedList);
  };

  return (
    <div id="index-page">
      {isHydrated ? (
        <div className="mb-8">
          <p>Connected: {"" + isConnected}</p>
          <p>Last message: {lastMessage || "-"}</p>
        </div>
      ) : null}

      {isHydrated ? (
        <AddIngredient
          ingredientOptions={ingredientOptions}
          ingredients={ingredients}
          list={list}
          setList={setList}
          emitSocket={emitSocket}
        />
      ) : null}

      <div className="mb-16">
        {list.length > 0 && (
          <>
            <span className="flex mb-4">
              There {list.length === 1 ? `is ${list.length} item` : `are ${list.length} items`} in your list
            </span>

            {list.map((i: Ingredient) => {
              return <ShoppingItem key={i.id} shoppingItem={i} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}
