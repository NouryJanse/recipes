import type { FunctionalComponent, Ref, RefObject } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import INGREDIENT_UNITS from "../../constants/INGREDIENT_UNITS";
import type { TypeShoppingItem } from "../../services/types.db";
import { nanoid } from "nanoid";
import Modal from "../Modal";
import Button from "../Form/Button";
import InputText from "../Form/InputText";
import Select from "../Form/Select";
import { $list, setModalShoppingItem, setShoppingList } from "../../services/store";
import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";
import { syncToSocket, updateLocalStorage } from "../ShoppingList/ShoppingList";
import replaceShoppingItemInList from "../../helpers/replaceShoppingItemInList";

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
  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<FormStateType>(initialShoppingItemModalData);

  useEffect(() => {
    if (isOpen) {
      focusOnIngredientInput(focusInputRef);
    }
  }, [isOpen]);

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="inputContainer">
          <InputText
            inputRef={focusInputRef}
            value={formState.ingredientName}
            onInput={handleInputChange}
            label="Ingredient"
            defaultValue={"Courgette"}
            placeholder="Enter your ingredient"
          />

          <div>
            <label>
              <span>Amount</span>
              <input
                value={formState.amount}
                name="amount"
                min={0}
                onInput={handleInputChange}
                style={{ maxWidth: "80px" }}
                type="number"
              />
            </label>
          </div>

          <Select label="Unit" onInput={handleInputChange} selected={formState.unit} />
        </div>

        <Button type="button" children="Save" style="primary" onClick={onSubmit} />
      </form>
    </Modal>
  );
};

const getShoppingItemObject = (formState: FormStateType, editedShoppingItem?: TypeShoppingItem): TypeShoppingItem => {
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

const focusOnIngredientInput = (focusInputRef: RefObject<HTMLInputElement>) => {
  focusInputRef.current!.focus();
};

const handleOnAdd = (formState: FormStateType) => {
  const newShoppingItem = getShoppingItemObject(formState, undefined);
  const items = [...$list.get(), newShoppingItem];
  const updatedList = sortShoppingListOnDate(items);

  setShoppingList(updatedList);
  setModalShoppingItem(undefined);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

const handleOnEdit = (formState: FormStateType, editedShoppingItem: TypeShoppingItem) => {
  const newShoppingItem = getShoppingItemObject(formState, editedShoppingItem);
  const items = replaceShoppingItemInList($list.get(), editedShoppingItem, newShoppingItem);
  const updatedList = sortShoppingListOnDate(items);

  setShoppingList(updatedList);
  setModalShoppingItem(undefined);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

export default CreateShoppingItemModal;
