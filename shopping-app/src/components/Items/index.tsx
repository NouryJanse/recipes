import type { FunctionalComponent } from "preact";
import ShoppingItem from "../ShoppingItem";
import { useStore } from "@nanostores/preact";
import { $shoppingList, $shoppingListRecipes } from "../../services/store";
import ShoppingItemRecipe from "../Groceries/Items/ShoppingItemRecipe";

type ShoppingItemsProps = {};

const ShoppingItems: FunctionalComponent<ShoppingItemsProps> = ({}) => {
  const shoppingList = useStore($shoppingList);
  const shoppingListRecipes = useStore($shoppingListRecipes);
  return (
    <>
      <div>
        {shoppingListRecipes.length ? <h4>Recipes</h4> : ""}
        {shoppingListRecipes.map((recipe: Recipe) => (
          <ShoppingItemRecipe recipe={recipe} />
        ))}
      </div>

      <div>
        {shoppingListRecipes.length && shoppingList.length ? <h4>Shopping items</h4> : ""}
        {shoppingList.length ? shoppingList.map((shoppingItem) => <ShoppingItem shoppingItem={shoppingItem} />) : ""}
      </div>
    </>
  );
};

export default ShoppingItems;
