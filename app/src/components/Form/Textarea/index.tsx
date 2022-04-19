import { StyledTextArea, StyledLabel } from './styled';

const TextArea = ({ label, defaultValue, placeholder, name, validation, register }) => {
  return (
    <div>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledTextArea
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, validation)}
        placeholder={placeholder}
      ></StyledTextArea>
    </div>
  );
};

export default TextArea;
