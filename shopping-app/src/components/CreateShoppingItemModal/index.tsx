import type { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import INGREDIENT_UNITS from "../../constants/INGREDIENT_UNITS";
import type { TypeShoppingItem } from "../../services/types.db";
import { nanoid } from "nanoid";
import Modal from "../Modal";
import Button from "../Form/Button";
import InputText from "../Form/InputText";
import Select from "../Form/Select";

export interface FormStateType {
  amount: string;
  ingredientName: string;
  unit: string;
}

const initialShoppingItemModalData: FormStateType = {
  amount: "",
  ingredientName: "",
  unit: "",
};

type CreateShoppingItemProps = {
  list: TypeShoppingItem[];
  onAdd: (items: TypeShoppingItem[]) => void;
  isOpen: boolean;
  onClose: () => void;
  editedShoppingItem: undefined | TypeShoppingItem;
};

const CreateShoppingItemModal: FunctionalComponent<CreateShoppingItemProps> = ({
  list,
  onAdd,
  isOpen,
  onClose,
  editedShoppingItem,
}) => {
  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<FormStateType>(initialShoppingItemModalData);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      focusInputRef.current!.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editedShoppingItem) {
      setFormState({
        amount: editedShoppingItem.amount.toString(),
        ingredientName: editedShoppingItem.ingredientName,
        unit: editedShoppingItem.unit,
      });
    } else {
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

  const onChange = (): void => {
    console.log(editedShoppingItem);

    if (editedShoppingItem && editedShoppingItem.id) {
      const newShoppingItem = formatShoppingItem(formState, editedShoppingItem);

      onAdd([
        ...list.map((existingShoppingItem) => {
          return existingShoppingItem.id === editedShoppingItem.id ? newShoppingItem : existingShoppingItem;
        }),
      ]);
      return;
    }

    const newShoppingItem = formatShoppingItem(formState, undefined);

    onAdd([...list, newShoppingItem]);
    setFormState(initialShoppingItemModalData);
  };

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      title={editedShoppingItem ? `Editing ${formState.ingredientName}...` : "Add new shopping item"}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChange();
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

        <Button type="button" children="Save" style="primary" onClick={onChange} />
      </form>
    </Modal>
  );
};

const formatShoppingItem = (formState: FormStateType, editedShoppingItem?: TypeShoppingItem): TypeShoppingItem => {
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

export default CreateShoppingItemModal;
