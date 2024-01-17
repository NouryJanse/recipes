import type { FunctionalComponent } from "preact";

import { useStore } from "@nanostores/preact";
import { $shoppingList } from "../../../services/store";
import { ShoppingItem } from "../..";

const Items: FunctionalComponent = ({}) => {
  const shoppingList = useStore($shoppingList);
  return (
    <>{shoppingList.length ? shoppingList.map((shoppingItem) => <ShoppingItem shoppingItem={shoppingItem} />) : ""}</>
  );
};

export default Items;
