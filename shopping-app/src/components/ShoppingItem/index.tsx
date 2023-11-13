import { useEffect, useState } from "preact/hooks";
import type { TypeShoppingItem } from "../../services/types.db";
import type { FunctionComponent } from "preact";

type ShoppingItemProps = {
  shoppingItem: TypeShoppingItem;
  onDelete: (id: string) => void;
  onUpdate: (shoppingItem: TypeShoppingItem) => void;
  onEdit: (shoppingItem: TypeShoppingItem) => void;
};

const isNew = (updatedAt: string): boolean => {
  return Math.abs(new Date(updatedAt).getTime() - Date.now()) < 1000;
};

const ShoppingItem: FunctionComponent<ShoppingItemProps> = ({ shoppingItem, onDelete, onUpdate, onEdit }) => {
  const [localShoppingItem, setLocalShoppingItem] = useState<TypeShoppingItem>(shoppingItem);

  const onCheck = () => {
    const updatedItem = {
      ...localShoppingItem,
      checked: !localShoppingItem.checked,
    };
    setLocalShoppingItem(updatedItem);
    onUpdate(updatedItem);
  };

  useEffect(() => {
    setLocalShoppingItem(shoppingItem);
  }, [shoppingItem]);

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
        <button className="blue" onClick={() => onEdit(shoppingItem)}>
          Edit
        </button>

        <button className="red" onClick={() => onDelete(shoppingItem.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShoppingItem;
