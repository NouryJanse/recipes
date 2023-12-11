import type { FunctionComponent } from "preact";
import Inputs from "./inputs";
import Button from "../Form/Button";

type FormProps = {
  onSubmit: () => void;
  isOpen: boolean;
};

const Form: FunctionComponent<FormProps> = ({ onSubmit, isOpen }) => {
  return (
    <>
      <Inputs isOpen={isOpen} />
      <Button type="button" children="Save" style="primary" onClick={onSubmit} />
    </>
  );
};

export default Form;
