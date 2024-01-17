import type { FunctionComponent } from "preact";
import Inputs from "./inputs";
import Button from "../../Form/Button";

type FormProps = {
  onSubmit: () => void;
};

const Form: FunctionComponent<FormProps> = ({ onSubmit }) => {
  return (
    <div className="modal--grocery-item">
      <Inputs />
      <Button type="button" children="Save" style="primary" onClick={onSubmit} />
    </div>
  );
};

export default Form;
