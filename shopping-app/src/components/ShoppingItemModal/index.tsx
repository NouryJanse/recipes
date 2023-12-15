import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { useEffect, useState } from "preact/hooks";

import { handleOnSubmit, modalTitle } from "./helpers";
import {
  $formState,
  resetFormState,
  setFormState,
  $modalShoppingItem,
  $modalShoppingItemOpened,
  setModalShoppingItemOpened,
  setModalShoppingItem,
} from "../../services/store";

import SeasonalVeggieList from "../SeasonalVeggieList";
import Modal from "../Modal";
import Form from "./form";

const CreateShoppingItemModal: FunctionalComponent = () => {
  const formState = useStore($formState);
  const editedShoppingItem = useStore($modalShoppingItem);
  const modalShoppingItemOpened = useStore($modalShoppingItemOpened);
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
  }, [modalShoppingItemOpened]);

  const onSubmit = (): void => {
    handleOnSubmit(editedShoppingItem);
    onClose();
  };

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={modalShoppingItemOpened}
      onClose={onClose}
      title={modalTitle(editedShoppingItem, formState)}
    >
      <Form onSubmit={onSubmit} isOpen={modalShoppingItemOpened} />

      {createNewMode && <SeasonalVeggieList />}
    </Modal>
  );
};

const onClose = () => {
  setModalShoppingItemOpened(false);
  setModalShoppingItem(undefined);
};

export default CreateShoppingItemModal;
