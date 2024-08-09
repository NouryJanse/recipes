import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";

// data
import { $modalShoppingItem, setGroceryItemModalOpened } from "../../services/store";
import { useStore } from "@nanostores/preact";

// UI
import { useSocket } from "./useSocket";
import { checkForExistingShoppingList } from "./helpers";
import CreateShoppingItemModal from "../Modal/GroceryItemModal";
import { Button } from "..";
import Items from "./Items";

type GroceriesProps = {
  dbShoppingList: any;
};

const Groceries: FunctionComponent<GroceriesProps> = ({ dbShoppingList }) => {
  const modalShoppingItem = useStore($modalShoppingItem);
  // const { isConnected } = useSocket();
  const isConnected = false;

  useEffect(() => {
    checkForExistingShoppingList(dbShoppingList);
  }, []);

  useEffect(() => {
    if (modalShoppingItem) {
      setGroceryItemModalOpened(true);
    } else {
      setGroceryItemModalOpened(false);
    }
  }, [modalShoppingItem]);

  return (
    <div className="shopping--items">
      <CreateShoppingItemModal />
      <div className="shopping--items-title-container">
        <ShoppingListHeader isConnected={isConnected} />
        <Button type="button" style="secondary" onClick={() => setGroceryItemModalOpened(true)} label="Add" />
      </div>
      <Items />
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

export default Groceries;
