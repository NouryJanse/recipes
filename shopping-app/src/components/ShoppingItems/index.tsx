import type { FunctionalComponent } from "preact";
import ShoppingItem from "../ShoppingItem";
import { useStore } from "@nanostores/preact";
import { $shoppingList, $shoppingListRecipes } from "../../services/store";
import ShoppingItemRecipe from "../ShoppingItemRecipe";

type ShoppingItemsProps = {};

const ShoppingItems: FunctionalComponent<ShoppingItemsProps> = ({}) => {
  const shoppingList = useStore($shoppingList);
  const shoppingListRecipes = useStore($shoppingListRecipes);
  return (
    <>
      {shoppingListRecipes.map((recipe: Recipe) => (
        <ShoppingItemRecipe recipe={recipe} />
      ))}
      {shoppingList.map((shoppingItem) => (
        <ShoppingItem shoppingItem={shoppingItem} />
      ))}
    </>
  );
};

export default ShoppingItems;
