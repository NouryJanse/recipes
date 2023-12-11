import { useEffect, useState } from "preact/hooks";
import type { TypeShoppingItem } from "../../services/types.db";
import type { FunctionComponent } from "preact";
import Button from "../Form/Button";
import { onDelete, onEdit, onUpdate } from "./helpers";

type ShoppingItemProps = {
  shoppingItem: TypeShoppingItem;
};

const ShoppingItem: FunctionComponent<ShoppingItemProps> = ({ shoppingItem }) => {
  const [localShoppingItem, setLocalShoppingItem] = useState<TypeShoppingItem>(shoppingItem);

  useEffect(() => {
    // if changes occur in the shopping item, update immediately
    setLocalShoppingItem(shoppingItem);
  }, [shoppingItem]);

  const onCheck = () => {
    const updatedItem = {
      ...localShoppingItem,
      checked: !localShoppingItem.checked,
    };
    setLocalShoppingItem(updatedItem);
    onUpdate(updatedItem);
  };

  return (
    <div className="shoppingItem">
      <div onClick={onCheck}>
        <input type="checkbox" name="checked" value="Bike" checked={shoppingItem.checked} />

        <span className={`amount-unit-ingredient ${isNew(localShoppingItem.updatedAt) ? "highlight" : ""}`}>
          <div className="amount-unit">
            {localShoppingItem.amount}
            {localShoppingItem?.unit} {` `}
          </div>
          {localShoppingItem?.ingredientName}
        </span>
      </div>

      <div>
        <Button type="button" style="primary" children="Edit" onClick={() => onEdit(shoppingItem)} />
        <Button type="button" style="tertiary" children="Delete" onClick={() => onDelete(shoppingItem.id)} />
      </div>
    </div>
  );
};

const isNew = (updatedAt: string): boolean => {
  return Math.abs(new Date(updatedAt).getTime() - Date.now()) < 1000;
};

export default ShoppingItem;
