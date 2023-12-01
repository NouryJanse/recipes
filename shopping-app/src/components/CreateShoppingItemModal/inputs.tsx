import type { FunctionComponent, RefObject } from "preact";
import InputText from "../Form/InputText";
import InputNumber from "../Form/InputNumber";
import Select from "../Form/Select";
import { useEffect, useRef } from "preact/hooks";
import { handleInputChange } from "./helpers";
import type { FormStateType } from "../../services/store";

type InputsProps = {
  formState: FormStateType;
  isOpen: boolean;
};

const Inputs: FunctionComponent<InputsProps> = ({ formState, isOpen }) => {
  const focusInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (isOpen) {
      focusOnIngredientInput(focusInputRef);
    }
  }, [isOpen]);

  return (
    <div className="input-container">
      <div className="ingredient-name">
        <InputText
          name="ingredientName"
          inputRef={focusInputRef}
          value={formState.ingredientName}
          onInput={handleInputChange}
          label="Ingredient"
          defaultValue="Courgette"
          placeholder="Enter your ingredient"
        />
      </div>

      <div className="amount-unit">
        <InputNumber
          inputRef={null}
          value={formState.amount}
          onInput={handleInputChange}
          label="Amount"
          name="amount"
          defaultValue="0"
          placeholder="0"
          style={{ maxWidth: "80px" }}
        />
        <Select label="Unit" onInput={handleInputChange} selected={formState.unit} />
      </div>
    </div>
  );
};

const focusOnIngredientInput = (focusInputRef: RefObject<HTMLInputElement>) => {
  focusInputRef.current!.focus();
};
export default Inputs;
