import type { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import type { TypeShoppingItem } from "../../services/types.db";
import Modal from "../Modal";
import Form from "./form";
import { handleOnSubmit } from "./helpers";
import SeasonalVeggieList from "../SeasonalVeggieList";
import { $formState, resetFormState, setFormState, type FormStateType } from "../../services/store";
import { useStore } from "@nanostores/preact";

type CreateShoppingItemProps = {
  isOpen: boolean;
  onClose: () => void;
  editedShoppingItem: undefined | FormStateType | TypeShoppingItem;
};

const CreateShoppingItemModal: FunctionalComponent<CreateShoppingItemProps> = ({
  isOpen,
  onClose,
  editedShoppingItem,
}) => {
  const formState = useStore($formState);

  useEffect(() => {
    if (editedShoppingItem) {
      // update form state
      setFormState({
        amount: editedShoppingItem.amount.toString(),
        ingredientName: editedShoppingItem.ingredientName,
        unit: editedShoppingItem.unit,
      });
    } else {
      // reset from state
      resetFormState();
    }
  }, [editedShoppingItem]);

  const onSubmit = (): void => {
    if (editedShoppingItem?.id) handleOnSubmit(editedShoppingItem);
    onClose();
  };

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      title={
        editedShoppingItem?.id
          ? `Editing ${formState.ingredientName}`
          : editedShoppingItem?.ingredientName
            ? `Adding ${formState.ingredientName}`
            : "Add new shopping item"
      }
    >
      <Form onSubmit={onSubmit} formState={formState} isOpen={isOpen} />
      <SeasonalVeggieList />
    </Modal>
  );
};
export default CreateShoppingItemModal;
