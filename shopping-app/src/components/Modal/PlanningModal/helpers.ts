import { nanoid } from "nanoid";
import type { TypeShoppingItem } from "../../../services/types.db";
import {
  $modalRecipeItem,
  $planningModalOpened,
  $shoppingListRecipes,
  getShoppingListRecipes,
  setShoppingListRecipes,
} from "../../../services/store";
import updateArrayWithObjectById from "../../../helpers/updateArrayWithObjectById";
import deleteObjectWithIdFromArray from "../../../helpers/deleteObjectWithIdFromArray";
import { syncToSocket } from "../../../helpers/syncToSocket";
import { $shoppingList, setShoppingList } from "../../../services/store";

export const onSubmit = (recipeItems: TypeShoppingItem[]) => {
  const modalitems = $shoppingListRecipes.get();
  const id = $modalRecipeItem.get()?.id;

  if (modalitems && id) {
    setShoppingListRecipes(
      // @ts-ignore:next-line
      deleteObjectWithIdFromArray(
        modalitems.map((item) => {
          return { ...item, id: `${item.id}` };
        }),
        id.toString()
      )
    );
  }

  addIngredientsFromRecipeToList(recipeItems);
  $modalRecipeItem.set(undefined);
  $planningModalOpened.set(false);
};

export const onUpdate = (recipeItem: TypeShoppingItem, recipeItems: TypeShoppingItem[], setRecipeItems: any) => {
  setRecipeItems(updateArrayWithObjectById(recipeItems, recipeItem));
};

export const addIngredientsFromRecipeToList = (shoppingItems: TypeShoppingItem[]) => {
  const skiplist: TypeShoppingItem[] = [];

  // update existing shopping items with the addition of the recipe ingredients
  const updatedShoppingList = $shoppingList.get().map((existingShoppingItem) => {
    const exists = shoppingItems.find((recipeIngredient) => {
      const isPresent = recipeIngredient.ingredientName === existingShoppingItem.ingredientName;
      if (isPresent) skiplist.push({ ...recipeIngredient, updatedAt: new Date().toISOString() });
      return isPresent;
    });

    if (exists) {
      return {
        ...existingShoppingItem,
        amount: existingShoppingItem.amount + exists.amount,
        updatedAt: new Date().toISOString(),
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
  syncToSocket();
};

export const saveRecipeToPlanning = (cookingDate: string, recipe: any) => {
  const newPlanningRecipe = { cookingDate, ...recipe };
  const shoppingListRecipes = getShoppingListRecipes();
  const contains = shoppingListRecipes.find((listRecipe: any) => listRecipe.cookingDate === cookingDate);

  if (!contains) {
    if (shoppingListRecipes.length) setShoppingListRecipes([newPlanningRecipe, ...shoppingListRecipes]);
    if (!shoppingListRecipes.length) setShoppingListRecipes([newPlanningRecipe]);
    syncToSocket();
  }
};
