import { StyledTextArea, StyledLabel } from './styled'

const TextArea = ({ label, defaultValue, placeholder, name, validation, register }: any) => {
  return (
    <div>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledTextArea
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, validation)}
      ></StyledTextArea>
    </div>
  )
}

export default TextArea
