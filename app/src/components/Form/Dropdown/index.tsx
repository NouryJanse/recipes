import { StyledDropdown, StyledOption, StyledLabel } from './styled'

const Dropdown = ({
  label,
  name,
  // validation,
  // register,
  disabled,
  options,
  defaultValue,
  onChange,
}: any) => {
  return (
    <div>
      <StyledLabel htmlFor={name}>
        {label}
        <StyledDropdown
          id={name}
          name={name}
          // {...register(name, validation)}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          defaultValue={defaultValue}
        >
          {options.map((option: HTMLOptionElement, i: number) => {
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
    </div>
  )
}

export default Dropdown
