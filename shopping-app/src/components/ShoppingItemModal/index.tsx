import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { useEffect, useState } from "preact/hooks";

import { handleOnSubmit, modalTitle } from "./helpers";
import { $formState, resetFormState, setFormState, type FormStateType, $modalShoppingItem } from "../../services/store";

import SeasonalVeggieList from "../SeasonalVeggieList";
import Modal from "../Modal";
import Form from "./form";

type CreateShoppingItemProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateShoppingItemModal: FunctionalComponent<CreateShoppingItemProps> = ({ isOpen, onClose }) => {
  const formState = useStore($formState);
  const editedShoppingItem = useStore($modalShoppingItem);
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
  }, [isOpen]);

  const onSubmit = (): void => {
    handleOnSubmit(editedShoppingItem);
    onClose();
  };

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose} title={modalTitle(editedShoppingItem, formState)}>
      <Form onSubmit={onSubmit} isOpen={isOpen} />

      {createNewMode && <SeasonalVeggieList />}
    </Modal>
  );
};

export default CreateShoppingItemModal;
