import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";

// data
import { $modalShoppingItem, setModalShoppingItemOpened } from "../../services/store";
import { useStore } from "@nanostores/preact";

// UI
import { useSocket } from "./useSocket";
import { checkForExistingShoppingList } from "./helpers";
import CreateShoppingItemModal from "../ShoppingItemModal";
import { Button, RecipeModal, ShoppingItems } from "..";

type ShoppingListProps = {
  dbShoppingList: any;
};

const ShoppingList: FunctionComponent<ShoppingListProps> = ({ dbShoppingList }) => {
  const modalShoppingItem = useStore($modalShoppingItem);
  const { isConnected } = useSocket();

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
        <Button type="button" style="secondary" onClick={() => setModalShoppingItemOpened(true)} label="Add" />
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
