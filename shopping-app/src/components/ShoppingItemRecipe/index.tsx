import { useEffect, useState, type StateUpdater } from "preact/hooks";
import type { TypeShoppingItem } from "../../services/types.db";
import type { FunctionComponent } from "preact";
import { onDelete } from "../ShoppingItem/helpers";
import Button from "../Form/Button";
import { addIngredientsFromRecipeToList } from "./helpers";
import { setModalRecipeItem, setModalRecipeItemOpened } from "../../services/store";

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
      <div>
        <span className={`amount-unit-ingredient ${isNew(localRecipe.updatedAt) ? "highlight" : ""}`}>
          {/* <div className="amount-unit"></div> */}
          {localRecipe.name}
        </span>
      </div>

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
