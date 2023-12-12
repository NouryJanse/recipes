import type { FunctionComponent } from "preact";

type InputTextProps = {
  label?: string;
  inputRef?: any;
  value: string;
  name: string;
  onInput: (event: Event) => void;
  defaultValue?: string;
  placeholder: string;
};

const InputText: FunctionComponent<InputTextProps> = ({
  label,
  inputRef,
  value,
  name,
  onInput,
  defaultValue,
  placeholder,
}) => {
  return (
    <div>
      <label>
        {label && <span>{label}</span>}

        <input
          ref={inputRef ? inputRef : {}}
          type="text"
          value={value}
          name={name}
          defaultValue={defaultValue ? defaultValue : ""}
          onInput={onInput}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default InputText;
