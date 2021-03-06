import React, { ChangeEventHandler, ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'

import ErrorMessage from '../../../atoms/ErrorMessage'
import { StyledDropdown, StyledOption, StyledLabel } from './styled'

type DropdownProps = {
  label: string
  name: string
  validation: object
  register: UseFormRegister<FieldValues>
  errors: string | boolean
  disabled: boolean
  options: Option[]
  defaultValue: string
  onChange?: ChangeEventHandler
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
}): ReactElement => {
  return (
    <div>
      <StyledLabel htmlFor={name}>
        {label}
        <StyledDropdown
          {...register(name, validation)}
          id={name}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
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
      {errors && <ErrorMessage message={errors} />}
    </div>
  )
}

Dropdown.defaultProps = {
  onChange: (): boolean => {
    return true
  },
}

export default Dropdown
