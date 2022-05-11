import ErrorMessage from '../../Generic/ErrorMessage'
import { StyledDropdown, StyledOption, StyledLabel } from './styled'

interface DropdownProps {
  label: string
  name: string
  disabled: boolean
  register: Function
  validation: string | object
  errors: string | boolean | HTMLElement
  options: {}[]
  defaultValue: string
  onChange?: (changedValue: string) => void
}

const Dropdown = ({
  label,
  name,
  validation,
  register,
  disabled,
  options,
  errors,
  defaultValue,
}: DropdownProps) => {
  return (
    <div>
      <StyledLabel htmlFor={name}>
        {label}
        <StyledDropdown
          id={name}
          name={name}
          {...register(name, validation)}
          disabled={disabled}
          defaultValue={defaultValue}
        >
          {options.map((option: any, i: number) => {
            return (
              <StyledOption key={i} value={option.value} disabled={option.disabled}>
                {option.text}
              </StyledOption>
            )
          })}
        </StyledDropdown>
        {/* <svg>
          <use xlinkHref="#select-arrow-down"></use>
        </svg> */}
      </StyledLabel>
      <svg className="sprites">
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>
      {errors && <ErrorMessage message={errors}></ErrorMessage>}
    </div>
  )
}

export default Dropdown
