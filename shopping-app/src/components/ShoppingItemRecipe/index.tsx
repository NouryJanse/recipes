import { useEffect, useState } from "preact/hooks";
import type { FunctionComponent } from "preact";

import { setModalRecipeItem, setModalRecipeItemOpened } from "../../services/store";

import { onDelete } from "../ShoppingItem/helpers";

import Button from "../Form/Button";

type ShoppingItemRecipeProps = {
  recipe: Recipe;
};

const ShoppingItemRecipe: FunctionComponent<ShoppingItemRecipeProps> = ({ recipe }) => {
  const [localRecipe, setLocalRecipe] = useState<Recipe>(recipe);

  useEffect(() => {
    // if changes occur in the shopping item, update immediately
    setLocalRecipe(localRecipe);
  }, [localRecipe]);

  return (
    <div className="shoppingItem">
      <span className={`amount-unit-ingredient ${isNew(localRecipe.updatedAt) ? "highlight" : ""}`}>
        {localRecipe.name}
      </span>

      <div>
        <Button
          classes="small"
          type="button"
          style="primary"
          children="Add ingredients"
          onClick={() => {
            setModalRecipeItemOpened(true);
            setModalRecipeItem(localRecipe);
          }}
        />
        <Button
          classes="small"
          type="button"
          style="tertiary"
          children="Delete"
          onClick={() => onDelete(localRecipe.id.toString())}
        />
      </div>
    </div>
  );
};

const isNew = (updatedAt: string): boolean => {
  return Math.abs(new Date(updatedAt).getTime() - Date.now()) < 1000;
};

export default ShoppingItemRecipe;
