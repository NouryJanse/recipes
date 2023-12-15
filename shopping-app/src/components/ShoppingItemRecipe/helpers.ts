import { $shoppingList, setShoppingList } from "../../services/store";
import type { TypeShoppingItem } from "../../services/types.db";
import { syncToSocket, updateLocalStorage } from "../ShoppingList/helpers";

export const addIngredientsFromRecipeToList = (shoppingItems: TypeShoppingItem[]) => {
  const skiplist: TypeShoppingItem[] = [];

  // update existing shopping items with the addition of the recipe ingredients
  const updatedShoppingList = $shoppingList.get().map((existingShoppingItem) => {
    const exists = shoppingItems.find((recipeIngredient) => {
      const isPresent = recipeIngredient.ingredientName === existingShoppingItem.ingredientName;
      if (isPresent) skiplist.push(recipeIngredient);
      return isPresent;
    });

    if (exists) {
      return {
        ...existingShoppingItem,
        amount: existingShoppingItem.amount + exists.amount,
      };
    }
    return existingShoppingItem;
  });

  // filter the ingredients to get the new shopping Items (ingredients)
  const newItems = shoppingItems.filter((ingr: any) => {
    return !skiplist.find((skip) => {
      return skip.ingredientName === ingr.ingredientName;
    });
  });

  const updatedList = [...updatedShoppingList, ...newItems];

  setShoppingList(updatedList);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};
