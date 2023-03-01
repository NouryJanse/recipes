import React, { ChangeEvent, ChangeEventHandler, ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'

import ErrorMessage from '../../../atoms/ErrorMessage'
import { StyledDropdown, StyledOption, StyledLabel, FieldRowStyle } from './styled'

type DropdownProps = {
  label: string
  name: string
  validation: object
  register?: UseFormRegister<FieldValues>
  errors: errorObject
  disabled: boolean
  options: Option[]
  defaultValue: string
  onChange: ChangeEventHandler
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  validation,
  register,
  errors,
  disabled,
  options,
  defaultValue,
  onChange,
}): ReactElement => {
  return (
    <FieldRowStyle>
      <StyledLabel htmlFor={name}>
        {label}
        <StyledDropdown
          {...(register ? { ...register(name, validation) } : {})}
          id={name}
          name={name}
          disabled={disabled}
          value={defaultValue}
          onChange={(e): ChangeEvent | void => onChange(e)}
        >
          {options.map((option: Option) => {
            return (
              <StyledOption key={option.id} value={option.value} disabled={option.disabled}>
                {option.text}
              </StyledOption>
            )
          })}
        </StyledDropdown>
      </StyledLabel>
      {errors && <ErrorMessage errorObject={errors} />}
    </FieldRowStyle>
  )
}

export default Dropdown
