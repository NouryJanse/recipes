import React, { ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { FieldRowStyle, LabelStyle, InputStyle } from './styled'

import { ErrorMessage } from '../../index'

type TextFieldProps = {
  name: string
  type: string
  label: string
  placeholder: string
  register: UseFormRegister<FieldValues>
  validation: object
  errors: string | boolean
  defaultValue?: string
}

const Textfield: React.FC<TextFieldProps> = ({
  name = '',
  type = '',
  label = '',
  placeholder = '',
  defaultValue = '',
  register,
  validation,
  errors,
}): ReactElement => {
  return (
    <FieldRowStyle>
      <LabelStyle htmlFor={name}>{label}</LabelStyle>

      <InputStyle
        {...register(name, validation)}
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />

      {errors && <ErrorMessage message={errors} />}
    </FieldRowStyle>
  )
}

Textfield.defaultProps = {
  defaultValue: '',
}

export default Textfield
