import { useEffect, useState, type StateUpdater } from "preact/hooks";
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

  return (
    <div className="shoppingItem">
      <div onClick={() => onCheck(localShoppingItem, setLocalShoppingItem)}>
        <input type="checkbox" name="checked" value="" checked={localShoppingItem.checked} />

        <span className={`amount-unit-ingredient ${isNew(localShoppingItem.updatedAt) ? "highlight" : ""}`}>
          <div className="amount-unit">
            {localShoppingItem.amount}
            {localShoppingItem?.unit} {` `}
          </div>
          {localShoppingItem?.ingredientName}
        </span>
      </div>

      <div>
        <Button classes="small" type="button" style="primary" children="Edit" onClick={() => onEdit(shoppingItem)} />
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

const onCheck = (localShoppingItem: TypeShoppingItem, setLocalShoppingItem: StateUpdater<TypeShoppingItem>) => {
  const updatedItem = {
    ...localShoppingItem,
    checked: !localShoppingItem.checked,
  };
  setLocalShoppingItem(updatedItem);

  onUpdate(updatedItem);
};

const isNew = (updatedAt: string): boolean => {
  return Math.abs(new Date(updatedAt).getTime() - Date.now()) < 1000;
};

export default ShoppingItem;
