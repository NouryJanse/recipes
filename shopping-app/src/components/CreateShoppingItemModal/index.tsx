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
  amount: "0",
  ingredientName: "",
  unit: "",
};

type CreateShoppingItemProps = {
  list: TypeShoppingItem[];
  onAdd: (items: TypeShoppingItem[]) => void;
  isOpen: boolean;
  onClose: () => void;
};

const CreateShoppingItemModal: FunctionalComponent<CreateShoppingItemProps> = ({ list, onAdd, isOpen, onClose }) => {
  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<ShoppingItemModalData>(initialShoppingItemModalData);
  // const screens = useBreakpoint();

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      focusInputRef.current!.focus();
    }
  }, [isOpen]);

  const handleInputChange = (event: Event): void => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onChange = (): void => {
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
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChange();
        }}
      >
        <h2>Add new shopping item</h2>
        {/* <div className="flex flex-col" style={{ width: `${screens.xl ? "400px" : screens.lg ? "320px" : "280px"}` }}> */}
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
                onChange={(e) => handleInputChange(e)}
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
                onChange={(e) => handleInputChange(e)}
                style={{ width: "25%" }}
                type="number"
              />
            </label>
          </div>

          <div>
            <label>
              <span>Unit</span>
              <select name="unit" onChange={(e) => handleInputChange(e)}>
                {INGREDIENT_UNITS.map((ingredient) => {
                  return <option value={ingredient.value}>{ingredient.text}</option>;
                })}
              </select>
            </label>
          </div>
        </div>

        <div>
          <button onClick={() => onChange}>Save</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateShoppingItemModal;
