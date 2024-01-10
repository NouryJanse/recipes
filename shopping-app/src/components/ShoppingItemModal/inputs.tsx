import type { FunctionComponent } from "preact";
import InputText from "../Form/InputText";
import InputNumber from "../Form/InputNumber";
import Select from "../Form/Select";
import { handleInputChange } from "./helpers";
import { $formState } from "../../services/store";
import { useStore } from "@nanostores/preact";
import INGREDIENT_UNITS from "../../constants/INGREDIENT_UNITS";

const Inputs: FunctionComponent = () => {
  const formState = useStore($formState);

  return (
    <div className="input-container">
      <div className="ingredient-name">
        <InputText
          name="ingredientName"
          autoFocus
          value={formState.ingredientName}
          onInput={handleInputChange}
          label="Ingredient"
          defaultValue=""
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
        <Select label="Unit" onInput={handleInputChange} selected={formState.unit} options={INGREDIENT_UNITS} />
      </div>
    </div>
  );
};

export default Inputs;
