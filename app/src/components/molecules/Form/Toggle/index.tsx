import React, { ChangeEventHandler, ReactElement, useEffect } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'

import ErrorMessage from '../../../atoms/ErrorMessage'
import { StyledInput, StyledSpan, StyledLabel } from './styled'

type ToggleProps = {
  label: string
  name: string
  register: UseFormRegister<FieldValues>
  checked: boolean
  // errors: string | boolean
  // disabled: boolean
  // options: Option[]
  // defaultValue: string
  handleToggle: ChangeEventHandler
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  name,
  register,
  handleToggle,
  checked,
  // errors,
  // disabled,
  // options,
  // defaultValue,
}): ReactElement => {
  return (
    <div className="relative">
      {label}
      <StyledInput
        className="react-switch-checkbox"
        id="react-switch-new"
        type="checkbox"
        {...register(name)}
        onChange={handleToggle}
        checked={checked}
      />
      <StyledLabel
        style={{ backgroundColor: checked ? '#06D6A0' : '' }}
        className="react-switch-label"
        htmlFor="react-switch-new"
      >
        <StyledSpan className="react-switch-button" />
      </StyledLabel>
      {/* <StyledLabel htmlFor={name}>
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
      {errors && <ErrorMessage message={errors} />} */}
    </div>
  )
}

// Dropdown.defaultProps = {
//   onChange: (): boolean => {
//     return true
//   },
// }

export default Toggle
