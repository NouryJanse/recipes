import React, { ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import ErrorMessage from '../../Generic/ErrorMessage'
import { StyledTextArea, StyledLabel } from './styled'

type TextAreaProps = {
  label: string
  placeholder: string
  name: string
  register: UseFormRegister<FieldValues>
  validation: object
  errors: string | boolean
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
    <div>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>

      <StyledTextArea
        {...register(name, validation)}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />

      {errors && <ErrorMessage message={errors} />}
    </div>
  )
}

TextArea.defaultProps = {
  defaultValue: '',
}

export default TextArea
