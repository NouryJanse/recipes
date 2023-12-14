import { useEffect, useState, type StateUpdater } from "preact/hooks";
import type { TypeShoppingItem } from "../../services/types.db";
import type { FunctionComponent } from "preact";
import { onDelete } from "../ShoppingItem/helpers";
import Button from "../Form/Button";
import { addIngredientsFromRecipeToList } from "./helpers";

type ShoppingItemRecipeProps = {
  shoppingItem: TypeShoppingItem;
};

const ShoppingItemRecipe: FunctionComponent<ShoppingItemRecipeProps> = ({ shoppingItem }) => {
  const [localShoppingItem, setLocalShoppingItem] = useState<TypeShoppingItem>(shoppingItem);

  useEffect(() => {
    // if changes occur in the shopping item, update immediately
    setLocalShoppingItem(shoppingItem);
  }, [shoppingItem]);

  return (
    <div className="shoppingItem">
      <div>
        <span className={`amount-unit-ingredient ${isNew(localShoppingItem.updatedAt) ? "highlight" : ""}`}>
          <div className="amount-unit">{localShoppingItem.name}</div>
          {localShoppingItem?.ingredientName}
        </span>
      </div>

      <div>
        <Button
          classes="small"
          type="button"
          style="primary"
          children="Add ingredients"
          onClick={() => addIngredientsFromRecipeToList(shoppingItem)}
        />
        <Button
          classes="small"
          type="button"
          style="tertiary"
          children="Delete"
          onClick={() => onDelete(shoppingItem.id)}
        />
      </div>
    </div>
  );
};

const isNew = (updatedAt: string): boolean => {
  return Math.abs(new Date(updatedAt).getTime() - Date.now()) < 1000;
};

export default ShoppingItemRecipe;
