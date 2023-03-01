import React, { ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { FieldRowStyle, LabelStyle, InputStyle } from './styled'

import { ErrorMessage } from '../../../index'

type TextFieldProps = {
  name: string
  type: string
  label: string
  placeholder: string
  register?: UseFormRegister<FieldValues>
  validation?: object
  errors?: errorObject
  defaultValue?: string
}

const Textfield: React.FC<TextFieldProps> = ({
  name = '',
  type = '',
  label = '',
  placeholder = '',
  defaultValue,
  register,
  validation,
  errors,
}): ReactElement => {
  return (
    <FieldRowStyle>
      <LabelStyle htmlFor={name}>{label}</LabelStyle>

      <InputStyle
        {...(register && validation ? { ...register(name, validation) } : {})}
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />

      {errors && <ErrorMessage errorObject={errors} />}
    </FieldRowStyle>
  )
}

Textfield.defaultProps = {
  defaultValue: '',
}

export default Textfield
