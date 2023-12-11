import type { FunctionalComponent } from "preact";
import ShoppingItem from "../ShoppingItem";
import type { TypeShoppingItem } from "../../services/types.db";

type ShoppingItemsProps = {
  list: TypeShoppingItem[];
};

const ShoppingItems: FunctionalComponent<ShoppingItemsProps> = ({ list }) => {
  return (
    <>
      {list.map((shoppingItem) => {
        return <ShoppingItem shoppingItem={shoppingItem} />;
      })}
    </>
  );
};

export default ShoppingItems;
