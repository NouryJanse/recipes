import type { FunctionComponent } from "preact";
import type { TypeShoppingItem } from "../../services/types.db";

type RecipeItemProps = {
  recipeItem: TypeShoppingItem;
  onUpdate: (recipeItem: TypeShoppingItem) => void;
  selectedNumberOfPersons: number;
};

const RecipeItem: FunctionComponent<RecipeItemProps> = ({ recipeItem, onUpdate }) => {
  return (
    <div className="shoppingItem">
      <div onClick={() => onUpdate({ ...recipeItem, checked: !recipeItem.checked })}>
        <input type="checkbox" name="checkThis" value="" checked={recipeItem.checked} />

        <span className={`amount-unit-ingredient`}>
          <div className="amount-unit">
            {roundedAmount(recipeItem.amount)}
            {recipeItem.unit}
          </div>
          {recipeItem.ingredientName}
        </span>
      </div>
    </div>
  );
};

const roundedAmount = (value: number): string => {
  if ((value % 1 != 0) === false) return value.toString();
  return value.toFixed(2);
};

export default RecipeItem;
