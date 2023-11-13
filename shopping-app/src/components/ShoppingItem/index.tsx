import { useEffect, useState } from "preact/hooks";
import type { TypeShoppingItem } from "../../services/types.db";
import type { FunctionComponent } from "preact";

type ShoppingItemProps = {
  shoppingItem: TypeShoppingItem;
  onDelete: (id: string) => void;
  onUpdate: (shoppingItem: TypeShoppingItem) => void;
  onEdit: (id: string) => void;
};

// use memo required?
const isNew = (updatedAt: string): boolean => {
  return Math.abs(new Date(updatedAt).getTime() - Date.now()) < 1000;
};

const ShoppingItem: FunctionComponent<ShoppingItemProps> = ({ shoppingItem, onDelete, onUpdate, onEdit }) => {
  const [localShoppingItem, setLocalShoppingItem] = useState<TypeShoppingItem>(shoppingItem);

  const onCheck = () => {
    const updatedItem = {
      ...localShoppingItem,
      checked: !localShoppingItem.checked,
      updatedAt: `${new Date().toISOString()}`,
    };
    setLocalShoppingItem(updatedItem);
    onUpdate(updatedItem);
  };

  useEffect(() => {
    setLocalShoppingItem({ ...shoppingItem });
  }, [shoppingItem]);

  return (
    <div
      className={`shoppingItem ${
        isNew(localShoppingItem.updatedAt) ? "highlight" : ""
      } flex justify-between rounded p-1`}
    >
      <div onClick={onCheck}>
        <span>{localShoppingItem?.ingredientName}</span>
      </div>

      <div>
        <span>
          {localShoppingItem.amount} {` `}
          {localShoppingItem?.unit} - {localShoppingItem.updatedAt}
        </span>

        <button onClick={() => onEdit(shoppingItem.id)}>Edit</button>
        <button onClick={() => onDelete(shoppingItem.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ShoppingItem;
