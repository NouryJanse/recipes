import ErrorMessage from '../../Generic/ErrorMessage'
import { StyledTextArea, StyledLabel } from './styled'

interface TextAreaProps {
  label: string
  defaultValue?: string
  placeholder: string
  name: string
  register: Function
  validation: string | object
  errors: string | boolean
}

const TextArea = ({
  label,
  defaultValue = '',
  placeholder = '',
  name,
  validation,
  register,
  errors,
}: TextAreaProps) => {
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
      {errors && <ErrorMessage message={errors}></ErrorMessage>}
    </div>
  )
}

export default TextArea
