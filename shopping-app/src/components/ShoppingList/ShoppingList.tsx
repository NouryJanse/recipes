import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";

// data
import { $modalShoppingItem, setModalShoppingItemOpened } from "../../services/store";
import { useStore } from "@nanostores/preact";

// UI
import CreateShoppingItemModal from "../ShoppingItemModal";
import ShoppingItems from "../ShoppingItems";
import Button from "../Form/Button";
import { checkForExistingShoppingList } from "./helpers";
import RecipeModal from "../RecipeModal";
import { useActivateSocket } from "./useActivateSocket";

type ShoppingListProps = {
  dbShoppingList: any;
};

const ShoppingList: FunctionComponent<ShoppingListProps> = ({ dbShoppingList }) => {
  const modalShoppingItem = useStore($modalShoppingItem);
  const { isConnected } = useActivateSocket();

  useEffect(() => {
    checkForExistingShoppingList(dbShoppingList);
  }, []);

  useEffect(() => {
    if (modalShoppingItem) {
      setModalShoppingItemOpened(true);
    } else {
      setModalShoppingItemOpened(false);
    }
  }, [modalShoppingItem]);

  return (
    <div className="shopping--items">
      <CreateShoppingItemModal />

      <RecipeModal />

      <div className="shopping--items-title-container">
        <ShoppingListHeader isConnected={isConnected} />
        <Button type="button" style="secondary" onClick={() => setModalShoppingItemOpened(true)} label="Add another" />
      </div>

      <ShoppingItems />
    </div>
  );
};

const ShoppingListHeader = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <h3>
      Your shopping list
      {isConnected ? <span className="online">Online</span> : <span className="offline">Offline</span>}
    </h3>
  );
};

export default ShoppingList;
