import type { FunctionComponent } from "preact";
import Inputs from "./inputs";
import Button from "../Form/Button";
import type { FormStateType } from ".";

type FormProps = {
  onSubmit: () => void;
  formState: FormStateType;
  handleInputChange: (event: Event) => void;
  isOpen: boolean;
};

const Form: FunctionComponent<FormProps> = ({ onSubmit, formState, handleInputChange, isOpen }) => {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Inputs formState={formState} handleInputChange={handleInputChange} isOpen={isOpen} />
        <Button type="button" children="Save" style="primary" onClick={onSubmit} />
      </form>
    </>
  );
};

export default Form;
