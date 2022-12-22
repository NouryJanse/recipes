import React, { ChangeEventHandler, ReactElement, useEffect } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'

import ErrorMessage from '../../../atoms/ErrorMessage'
import { StyledInput, StyledSpan, StyledLabel } from './styled'

type ToggleProps = {
  label: string
  name: string
  register: UseFormRegister<FieldValues>
  checked: boolean
  handleToggle: ChangeEventHandler
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  name,
  register,
  handleToggle,
  checked,
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
    </div>
  )
}

export default Toggle
