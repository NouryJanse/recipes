import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { useEffect, useState } from "preact/hooks";

import { handleOnSubmit, modalTitle } from "./helpers";
import {
  $formState,
  resetFormState,
  setFormState,
  $modalShoppingItem,
  setModalShoppingItem,
  setGroceryItemModalOpened,
  $groceryItemModalOpened,
} from "../../../services/store";

import SeasonalVeggieList from "../../SeasonalVeggieList";
import Modal from "..";
import Form from "./form";

const GroceryItemModal: FunctionalComponent = () => {
  const formState = useStore($formState);
  const editedShoppingItem = useStore($modalShoppingItem);
  const groceryItemModalOpened = useStore($groceryItemModalOpened);
  const [createNewMode, setCreateNewMode] = useState(false);

  useEffect(() => {
    if (editedShoppingItem) {
      // update form state
      setFormState({
        amount: editedShoppingItem?.amount ? editedShoppingItem?.amount.toString() : "",
        ingredientName: editedShoppingItem.ingredientName,
        unit: editedShoppingItem.unit,
      });
    } else {
      // reset from state
      resetFormState();
    }
  }, [editedShoppingItem]);

  useEffect(() => {
    if (editedShoppingItem === undefined) {
      setCreateNewMode(true);
    } else {
      setCreateNewMode(false);
    }
  }, [groceryItemModalOpened]);

  const onSubmit = (): void => {
    handleOnSubmit(editedShoppingItem);
    onClose();
  };

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={groceryItemModalOpened}
      onClose={onClose}
      title={modalTitle(editedShoppingItem, formState)}
      onSubmit={onSubmit}
    >
      <Form onSubmit={onSubmit} />

      {createNewMode && <SeasonalVeggieList />}
    </Modal>
  );
};

const onClose = () => {
  setGroceryItemModalOpened(false);
  setModalShoppingItem(undefined);
};

export default GroceryItemModal;
