import type { FunctionComponent } from "preact";
import Inputs from "./inputs";
import Button from "../Form/Button";

type FormProps = {
  onSubmit: () => void;
  isOpen: boolean;
};

const Form: FunctionComponent<FormProps> = ({ onSubmit, isOpen }) => {
  return (
    <div className="shopping-form">
      <Inputs isOpen={isOpen} />
      <Button type="button" children="Save" style="primary" onClick={onSubmit} />
    </div>
  );
};

export default Form;
