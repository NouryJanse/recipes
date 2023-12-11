import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

// data
import { $list, $modalShoppingItem, setModalShoppingItem } from "../../services/store";
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
  const list = useStore($list);
  const [dialogOpened, setDialogOpened] = useState(false);
  const modalShoppingItem = useStore($modalShoppingItem);

  useEffect(() => {
    activateSocket();
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

      <div className="ingredientsTitleContainer">
        <h3>Your shopping list</h3>
        <Button type="button" style="secondary" onClick={() => setDialogOpened(true)}>
          Add another
        </Button>
      </div>

      <ShoppingItems list={list} />
    </div>
  );
};

export default ShoppingList;
