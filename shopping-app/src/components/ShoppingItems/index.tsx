import type { FunctionalComponent } from "preact";
import ShoppingItem from "../ShoppingItem";
import { useStore } from "@nanostores/preact";
import { $shoppingList } from "../../services/store";
import ShoppingItemRecipe from "../ShoppingItemRecipe";

type ShoppingItemsProps = {};

const ShoppingItems: FunctionalComponent<ShoppingItemsProps> = ({}) => {
  const shoppingList = useStore($shoppingList);
  return (
    <>
      {shoppingList.map((shoppingItem) => {
        return shoppingItem.ingredientName ? (
          <ShoppingItem shoppingItem={shoppingItem} />
        ) : (
          <ShoppingItemRecipe shoppingItem={shoppingItem} />
        );
      })}
    </>
  );
};

export default ShoppingItems;
