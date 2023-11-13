import type { FunctionalComponent } from "preact";
import ShoppingItem from "../ShoppingItem";
import type { TypeShoppingItem } from "../../services/types.db";

type ShoppingItemsProps = {
  list: TypeShoppingItem[];
  onDelete: (id: string) => void;
  onUpdate: (item: TypeShoppingItem) => void;
  onEdit: (shoppingItem: TypeShoppingItem) => void;
};

const ShoppingItems: FunctionalComponent<ShoppingItemsProps> = ({ list, onDelete, onUpdate, onEdit }) => {
  return (
    <div>
      {list.map((shoppingItem) => {
        return <ShoppingItem shoppingItem={shoppingItem} onDelete={onDelete} onUpdate={onUpdate} onEdit={onEdit} />;
      })}
    </div>
  );
};

export default ShoppingItems;
