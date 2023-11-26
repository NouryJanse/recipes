import type { FunctionalComponent } from "preact";
import INGREDIENT_UNITS from "../../../constants/INGREDIENT_UNITS";

type SelectProps = {
  label: string;
  onInput: (event: Event) => void;
  selected: string;
};

const Select: FunctionalComponent<SelectProps> = ({ label, onInput, selected }) => {
  return (
    <div>
      <label>
        <span>{label}</span>
        <select name="unit" onInput={onInput}>
          {INGREDIENT_UNITS.map((ingredient) => {
            return (
              <option value={ingredient.value} selected={selected === ingredient.value}>
                {ingredient.text}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default Select;
