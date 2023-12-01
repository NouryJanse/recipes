import type { FunctionComponent } from "preact";

type InputNumberProps = {
  label: string;
  inputRef: any;
  value: string;
  name: string;
  onInput: (event: Event) => void;
  defaultValue?: string;
  placeholder: string;
  style: any;
};

const InputNumber: FunctionComponent<InputNumberProps> = ({
  label,
  inputRef,
  value,
  name,
  onInput,
  defaultValue,
  placeholder,
  style,
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
        style={style}
      />
    </label>
  );
};

export default InputNumber;
