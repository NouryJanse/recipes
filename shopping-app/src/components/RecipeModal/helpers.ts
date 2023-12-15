import { nanoid } from "nanoid";
import type { TypeShoppingItem } from "../../services/types.db";
import type { StateUpdater } from "preact/hooks";
import {
  $modalRecipeItem,
  $modalRecipeItemOpened,
  $shoppingListRecipes,
  setShoppingListRecipes,
} from "../../services/store";
import { addIngredientsFromRecipeToList } from "../ShoppingItemRecipe/helpers";
import updateArrayWithObjectById from "../../helpers/updateArrayWithObjectById";

export const mapRecipeIngredientsToShoppingItems = (
  modalRecipeItem: Recipe,
  setRecipeItems: StateUpdater<TypeShoppingItem[]>
) => {
  if (modalRecipeItem.ingredients && modalRecipeItem.ingredients.length) {
    const loc: TypeShoppingItem[] = modalRecipeItem.ingredients.map(({ amount, name, unit }: RecipeIngredient) => {
      return {
        id: nanoid(),
        amount: amount ? amount : 0,
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
