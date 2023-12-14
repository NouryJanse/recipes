import { nanoid } from "nanoid";
import { $shoppingList, setShoppingList } from "../../services/store";
import type { TypeShoppingItem } from "../../services/types.db";
import { syncToSocket, updateLocalStorage } from "../ShoppingList/helpers";

export const addIngredientsFromRecipeToList = (shoppingItem: TypeShoppingItem) => {
  const skiplist: TypeShoppingItem[] = [];

  // first verify if shoppingItem is a recipe
  if ("course" in shoppingItem && "ingredients" in shoppingItem) {
    // get ingredients from recipe
    const recipeIngredients: TypeShoppingItem[] = (shoppingItem.ingredients as TypeShoppingItem[]).map((ingredient) => {
      return {
        ingredientName: ingredient.name as string,
        unit: ingredient.unit,
        amount: ingredient.amount,
        checked: false,
        id: nanoid(),
        updatedAt: new Date().toISOString(),
      };
    });

    // update existing shopping items with the addition of the recipe ingredients
    const updatedShoppingList = $shoppingList.get().map((existingShoppingItem) => {
      if ("course" in existingShoppingItem) return existingShoppingItem;

      const exists = recipeIngredients.find((recipeIngredient) => {
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
    const newItems = recipeIngredients.filter((ingr: any) => {
      return !skiplist.find((skip) => {
        return skip.ingredientName === ingr.ingredientName;
      });
    });

    const updatedList = [
      ...updatedShoppingList.filter((shoppingitem) => ("course" in shoppingitem ? false : true)),
      ...newItems,
    ];

    setShoppingList(updatedList);
    updateLocalStorage(updatedList);
    syncToSocket(updatedList);
  }
};
