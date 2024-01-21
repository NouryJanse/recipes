import { nanoid } from "nanoid";
import type { TypeShoppingItem } from "../../../services/types.db";
import type { StateUpdater } from "preact/hooks";
import { $ingredientsModalOpened, $modalRecipeItem } from "../../../services/store";
import updateArrayWithObjectById from "../../../helpers/updateArrayWithObjectById";
import { syncToSocket } from "../../../helpers/syncToSocket";
import { $shoppingList, setShoppingList } from "../../../services/store";

export const mapRecipeIngredientsToShoppingItems = (
  modalRecipeItem: Recipe,
  setRecipeItems: StateUpdater<TypeShoppingItem[]>,
  selectedNumberOfPersons: number
) => {
  if (modalRecipeItem.ingredients && modalRecipeItem.ingredients.length) {
    const loc: TypeShoppingItem[] = modalRecipeItem.ingredients.map(({ amount, name, unit }: RecipeIngredient) => {
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
  addIngredientsFromRecipeToList(recipeItems);
  $modalRecipeItem.set(undefined);
  $ingredientsModalOpened.set(false);
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

export const resetForm = (setStep: any, setSelectedNumberOfPersons: any, setIngredientsModalOpened: any): void => {
  setStep(1);
  setSelectedNumberOfPersons(2);
  setIngredientsModalOpened(false);
};

export const recipeTitle = (step: number, recipeName: string): string => {
  if (step === 1) return "Do you want to plan this meal?";
  if (step === 2) return "Select the ingredients you want to add to the list";
  return recipeName;
};
