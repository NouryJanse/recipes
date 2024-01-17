import type { FunctionComponent } from "preact";

type InputNumberProps = {
  label: string;
  inputRef: any;
  value: string;
  name: string;
  onInput: (event: Event) => void;
  defaultValue?: string;
  placeholder: string;
};

const InputNumber: FunctionComponent<InputNumberProps> = ({
  label,
  inputRef,
  value,
  name,
  onInput,
  defaultValue,
  placeholder,
}) => {
  return (
    <label>
      <span>{label}</span>

      <input
        ref={inputRef}
        type="number"
        value={value}
        name={name}
        defaultValue={defaultValue ? defaultValue : ""}
        onInput={onInput}
        placeholder={placeholder}
      />
    </label>
  );
};

export default InputNumber;
