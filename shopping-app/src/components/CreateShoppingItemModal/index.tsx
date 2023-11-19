import type { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import INGREDIENT_UNITS from "../../constants/INGREDIENT_UNITS";
import type { TypeShoppingItem } from "../../services/types.db";
import { nanoid } from "nanoid";
import Modal from "../Modal";

export interface ShoppingItemModalData {
  amount: string;
  ingredientName: string;
  unit: string;
}

const initialShoppingItemModalData: ShoppingItemModalData = {
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
  const [formState, setFormState] = useState<ShoppingItemModalData>(initialShoppingItemModalData);
  // const screens = useBreakpoint();

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
    if (editedShoppingItem && editedShoppingItem.id) {
      // editing mode
      const newShoppingItem: TypeShoppingItem = {
        ...editedShoppingItem,
        ingredientName: formState.ingredientName,
        amount: Number.parseInt(formState.amount),
        unit: formState.unit,
        updatedAt: new Date().toISOString(),
      };

      onAdd([
        ...list.map((existingShoppingItem) => {
          return existingShoppingItem.id === editedShoppingItem.id ? newShoppingItem : existingShoppingItem;
        }),
      ]);
      return;
    }

    // new mode
    const newShoppingItem: TypeShoppingItem = {
      id: nanoid(),
      ingredientName: formState.ingredientName,
      amount: Number.parseInt(formState.amount),
      unit: formState.unit,
      updatedAt: new Date().toISOString(),
      checked: false,
    };

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
          <div>
            <label>
              <span>Ingredient</span>

              <input
                ref={focusInputRef}
                type="text"
                value={formState.ingredientName}
                name="ingredientName"
                defaultValue={"Courgette"}
                onInput={handleInputChange}
                placeholder="Enter your ingredient"
              />
            </label>
          </div>

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

          <div>
            <label>
              <span>Unit</span>
              <select name="unit" onInput={handleInputChange}>
                {INGREDIENT_UNITS.map((ingredient) => {
                  return (
                    <option value={ingredient.value} selected={formState.unit === ingredient.value}>
                      {ingredient.text}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>

        {/* <div> */}
        <button className="blue" onClick={() => onChange}>
          Save
        </button>
        {/* </div> */}
      </form>
    </Modal>
  );
};

export default CreateShoppingItemModal;
