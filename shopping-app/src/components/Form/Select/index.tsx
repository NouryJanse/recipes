import type { FunctionalComponent } from "preact";

type SelectProps = {
  label: string;
  onInput: (event: Event) => void;
  selected: string;
  options: any[]
};

const Select: FunctionalComponent<SelectProps> = ({ label, onInput, selected, options }) => {
  return (
    <label>
      <span>{label}</span>

      <select name="unit" onInput={onInput}>
        {options.map((ingredient) => {
          return (
            <option value={ingredient.value} selected={selected === ingredient.value}>
              {ingredient.text}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default Select;
