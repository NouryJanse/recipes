import type { FunctionComponent } from "preact";

type InputTextProps = {
  label: string;
  inputRef: any;
  value: string;
  onInput: (event: Event) => void;
  defaultValue: string;
  placeholder: string;
};

const InputText: FunctionComponent<InputTextProps> = ({
  label,
  inputRef,
  value,
  onInput,
  defaultValue,
  placeholder,
}) => {
  return (
    <div>
      <label>
        <span>{label}</span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          name="ingredientName"
          defaultValue={defaultValue}
          onInput={onInput}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default InputText;
