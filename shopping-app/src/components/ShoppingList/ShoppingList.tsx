import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

// data
import { $shoppingList, $modalShoppingItem, setModalShoppingItem } from "../../services/store";
import { useStore } from "@nanostores/preact";

// UI
import CreateShoppingItemModal from "../ShoppingItemModal";
import ShoppingItems from "../ShoppingItems";
import Button from "../Form/Button";
import { activateSocket, checkForExistingShoppingList } from "./helpers";

type ShoppingListProps = {
  dbShoppingList: any;
};

const ShoppingList: FunctionComponent<ShoppingListProps> = ({ dbShoppingList }) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const modalShoppingItem = useStore($modalShoppingItem);
  const { isConnected } = activateSocket();

  useEffect(() => {
    checkForExistingShoppingList(dbShoppingList);
  }, []);

  useEffect(() => {
    if (modalShoppingItem) {
      setDialogOpened(true);
    } else {
      setDialogOpened(false);
    }
  }, [modalShoppingItem]);

  return (
    <div className="shopping--items">
      <CreateShoppingItemModal
        isOpen={dialogOpened}
        onClose={() => {
          setDialogOpened(false);
          setModalShoppingItem(undefined);
        }}
      />

      <div className="shopping--items-title-container">
        <h3>
          Your shopping list
          {isConnected ? <span className="online">Online</span> : <span className="offline">Offline</span>}
        </h3>
        <Button type="button" style="secondary" onClick={() => setDialogOpened(true)} label="Add another" />
      </div>

      <ShoppingItems />
    </div>
  );
};

export default ShoppingList;
