import React, { ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { FieldRowStyle, LabelStyle, InputStyle } from './styled'

import { ErrorMessage } from '../../../index'

type NumberProps = {
  name: string
  label: string
  placeholder: string
  register: UseFormRegister<FieldValues>
  validation: object
  errors: errorObject
  defaultValue?: number
}

const Number: React.FC<NumberProps> = ({
  name = '',
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
        type="number"
        defaultValue={defaultValue}
        placeholder={placeholder}
      />

      {errors && <ErrorMessage errorObject={errors} />}
    </FieldRowStyle>
  )
}

Number.defaultProps = {
  defaultValue: 0,
}

export default Number
