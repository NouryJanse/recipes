import { $shoppingList, $shoppingListRecipes } from "../services/store";

export const updateLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("shoppingList", getLocalStorageObject($shoppingList.get()));
    localStorage.setItem("recipesList", getLocalStorageObject($shoppingListRecipes.get()));
  }
};

export const getLocalStorageObject = <Type>(list: Type[]) => {
  // const id = $user.get()?.id;
  return JSON.stringify({ _id: "652ffe8d262c73d000bcfd9a", updatedAt: `${new Date().toISOString()}`, list });
};
