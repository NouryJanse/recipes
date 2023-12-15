import type { FunctionComponent } from "preact";
import type { TypeShoppingItem } from "../../services/types.db";

type RecipeItemProps = {
  recipeItem: TypeShoppingItem;
  onUpdate: (recipeItem: TypeShoppingItem) => void;
};

const RecipeItem: FunctionComponent<RecipeItemProps> = ({ recipeItem, onUpdate }) => {
  return (
    <div className="shoppingItem">
      <div onClick={() => onUpdate({ ...recipeItem, checked: !recipeItem.checked })}>
        <input type="checkbox" name="checkThis" value="" checked={recipeItem.checked} />

        <span className={`amount-unit-ingredient`}>
          <div className="amount-unit">
            {recipeItem.amount}
            {recipeItem.unit}
          </div>
          {recipeItem.ingredientName}
        </span>
      </div>
    </div>
  );
};

export default RecipeItem;
