import { nanoid } from "nanoid";
import type { TypeShoppingItem } from "../../services/types.db";
import type { StateUpdater } from "preact/hooks";
import {
  $modalRecipeItem,
  $modalRecipeItemOpened,
  $shoppingListRecipes,
  setShoppingListRecipes,
} from "../../services/store";
import updateArrayWithObjectById from "../../helpers/updateArrayWithObjectById";
import deleteObjectWithIdFromArray from "../../helpers/deleteObjectWithIdFromArray";
import { syncToSocket } from "../../helpers/syncToSocket";
import { $shoppingList, setShoppingList } from "../../services/store";

export const mapRecipeIngredientsToShoppingItems = (
  modalRecipeItem: Recipe,
  setRecipeItems: StateUpdater<TypeShoppingItem[]>,
  selectedNumberOfPersons: number
) => {
  if (modalRecipeItem.ingredients && modalRecipeItem.ingredients.length) {
    const loc: TypeShoppingItem[] = modalRecipeItem.ingredients.map(({ amount, name, unit }: RecipeIngredient) => {
      console.log(amount, modalRecipeItem.numberOfPersons, selectedNumberOfPersons);

      return {
        id: nanoid(),
        amount: amount ? (amount / modalRecipeItem.numberOfPersons) * selectedNumberOfPersons : 0,
        ingredientName: name ? name : "",
        checked: true,
        unit: unit ? unit : "",
        updatedAt: new Date().toISOString(),
      };
    });
    if (loc && loc.length) setRecipeItems(loc);
  }
};

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
  $modalRecipeItemOpened.set(false);
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
      if (isPresent) skiplist.push(recipeIngredient);
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
