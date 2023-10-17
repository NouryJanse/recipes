import React, { ChangeEvent, ChangeEventHandler, ReactElement } from 'react'

import ErrorMessage from '../../../atoms/ErrorMessage'
import { StyledDropdown, StyledOption, StyledLabel, FieldRowStyle } from './styled'

type DropdownProps = {
  label: string
  name: string
  register?: any
  validation?: object
  errors?: errorObject
  disabled?: boolean
  options: Option[]
  defaultValue: string
  onChange: ChangeEventHandler
  classes?: string
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
  classes = '',
}): ReactElement => {
  return (
    <FieldRowStyle>
      <StyledLabel htmlFor={name}>
        {label}
        <StyledDropdown
          {...(register && validation ? { ...register(name, validation) } : {})}
          id={name}
          name={name}
          {...(disabled ? { disabled } : {})}
          value={defaultValue}
          onChange={(e): ChangeEvent | void => onChange(e)}
          className={classes}
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
