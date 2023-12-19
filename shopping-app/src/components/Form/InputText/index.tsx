import type { FunctionComponent } from "preact";

type InputTextProps = {
  label?: string;
  inputRef?: any;
  value: string;
  name: string;
  onInput: (event: Event) => void;
  defaultValue?: string;
  placeholder: string;
  autoFocus?: boolean;
};

const InputText: FunctionComponent<InputTextProps> = ({
  label,
  inputRef,
  value,
  name,
  onInput,
  defaultValue,
  placeholder,
  autoFocus,
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
          autofocus={autoFocus ? true : false}
          defaultValue={defaultValue ? defaultValue : ""}
          onInput={onInput}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default InputText;
