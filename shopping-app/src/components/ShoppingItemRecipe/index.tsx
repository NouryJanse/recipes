import type { FunctionComponent } from "preact";

import {
  $shoppingListRecipes,
  setModalRecipeItem,
  setModalRecipeItemOpened,
  setShoppingListRecipes,
} from "../../services/store";

import Button from "../Form/Button";
import deleteObjectWithIdFromArray from "../../helpers/deleteObjectWithIdFromArray";
import { useStore } from "@nanostores/preact";

type ShoppingItemRecipeProps = {
  recipe: Recipe;
};

const ShoppingItemRecipe: FunctionComponent<ShoppingItemRecipeProps> = ({ recipe }) => {
  const shoppingListRecipes = useStore($shoppingListRecipes);

  return (
    <div className="shoppingItem">
      <span className={`recipe-title ${isNew(recipe.updatedAt) ? "highlight" : ""}`}>{recipe.name}</span>

      <div>
        <Button
          classes="small"
          type="button"
          style="primary"
          children="Add ingredients"
          onClick={() => {
            setModalRecipeItemOpened(true);
            setModalRecipeItem(recipe);
          }}
        />

        <Button
          classes="small"
          type="button"
          style="tertiary"
          children="Delete"
          onClick={() => {
            setShoppingListRecipes(
              // @ts-ignore:next-line
              deleteObjectWithIdFromArray(shoppingListRecipes, recipe.id)
            );
          }}
        />
      </div>
    </div>
  );
};

const isNew = (updatedAt: string): boolean => {
  return Math.abs(new Date(updatedAt).getTime() - Date.now()) < 1000;
};

export default ShoppingItemRecipe;
