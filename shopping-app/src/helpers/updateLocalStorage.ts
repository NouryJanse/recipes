import { $shoppingList, $shoppingListRecipes, getUser } from "../services/store";

export const updateLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = getUser();
    if (user) {
      const { id } = user;
      localStorage.setItem("data", formatLocalStorageObject(id));
    }
  }
};

export const formatLocalStorageObject = <Type>(id: number) => {
  return JSON.stringify({
    userId: id.toString(),
    updatedAt: `${new Date().toISOString()}`,
    shoppingList: $shoppingList.get(),
    recipesList: $shoppingListRecipes.get(),
  });
};
