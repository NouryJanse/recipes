import type { FunctionalComponent } from "preact";
import ShoppingItem from "../ShoppingItem";
import { useStore } from "@nanostores/preact";
import { $shoppingList, $shoppingListRecipes } from "../../services/store";

type ShoppingItemsProps = {};

const ShoppingItems: FunctionalComponent<ShoppingItemsProps> = ({}) => {
  const shoppingList = useStore($shoppingList);
  return (
    <div>
      {shoppingList.length && (
        <>
          <h4>Shopping items</h4>
          {shoppingList.map((shoppingItem) => (
            <ShoppingItem shoppingItem={shoppingItem} />
          ))}
        </>
      )}
    </div>
  );
};

export default ShoppingItems;
