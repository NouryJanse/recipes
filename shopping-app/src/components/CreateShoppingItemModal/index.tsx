import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { TypeShoppingItem } from "../../services/types.db";
import { nanoid } from "nanoid";
import Modal from "../Modal";
import Button from "../Form/Button";
import { $list, setModalShoppingItem, setShoppingList } from "../../services/store";
import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";
import { syncToSocket, updateLocalStorage } from "../ShoppingList/ShoppingList";
import replaceShoppingItemInList from "../../helpers/replaceShoppingItemInList";
import Inputs from "./inputs";
import Form from "./form";

export interface FormStateType {
  amount: string;
  ingredientName: string;
  unit: string;
}

export const initialShoppingItemModalData: FormStateType = {
  amount: "",
  ingredientName: "",
  unit: "",
};

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
  const [formState, setFormState] = useState<FormStateType>(initialShoppingItemModalData);

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
      setFormState(initialShoppingItemModalData);
    }
  }, [editedShoppingItem]);

  const handleInputChange = (event: Event): void => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = (): void => {
    // editing a shopping item
    if (editedShoppingItem && editedShoppingItem.id) {
      handleOnEdit(formState, editedShoppingItem);
      return;
    }

    // append new shopping item and empty the form
    handleOnAdd(formState);
    onClose();
    setFormState(initialShoppingItemModalData);
    return;
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
      <Form onSubmit={onSubmit} formState={formState} handleInputChange={handleInputChange} isOpen={isOpen} />
    </Modal>
  );
};

const createShoppingItem = (formState: FormStateType, editedShoppingItem?: TypeShoppingItem): TypeShoppingItem => {
  if (editedShoppingItem) {
    return {
      ...editedShoppingItem,
      ingredientName: formState.ingredientName,
      amount: Number.parseInt(formState.amount),
      unit: formState.unit,
      updatedAt: new Date().toISOString(),
    };
  }

  return {
    id: nanoid(),
    ingredientName: formState.ingredientName,
    amount: Number.parseInt(formState.amount),
    unit: formState.unit,
    updatedAt: new Date().toISOString(),
    checked: false,
  };
};

const handleOnAdd = (formState: FormStateType) => {
  const newShoppingItem = createShoppingItem(formState, undefined);
  const items = [...$list.get(), newShoppingItem];
  const updatedList = sortShoppingListOnDate(items);

  setShoppingList(updatedList);
  setModalShoppingItem(undefined);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

const handleOnEdit = (formState: FormStateType, editedShoppingItem: TypeShoppingItem) => {
  const newShoppingItem = createShoppingItem(formState, editedShoppingItem);
  const items = replaceShoppingItemInList($list.get(), editedShoppingItem, newShoppingItem);
  const updatedList = sortShoppingListOnDate(items);

  setShoppingList(updatedList);
  setModalShoppingItem(undefined);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

export default CreateShoppingItemModal;
