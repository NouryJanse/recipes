import React, { ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import ErrorMessage from '../../../atoms/ErrorMessage'
import { StyledTextArea, StyledLabel, FieldRowStyle } from './styled'

type TextAreaProps = {
  label: string
  placeholder: string
  name: string
  register: UseFormRegister<FieldValues>
  validation: object
  errors: errorObject
  defaultValue?: string
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  defaultValue = '',
  placeholder = '',
  name,
  validation,
  register,
  errors,
}): ReactElement => {
  return (
    <FieldRowStyle>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>

      <StyledTextArea
        {...register(name, validation)}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />

      {errors && <ErrorMessage errorObject={errors} />}
    </FieldRowStyle>
  )
}

TextArea.defaultProps = {
  defaultValue: '',
}

export default TextArea
