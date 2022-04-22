import { StyledDropdown, StyledOption, StyledLabel } from './styled'

const Dropdown = ({ label, name, validation, register, disabled, options, defaultValue }: any) => {
  options = options.map((option: HTMLOptionElement) => {
    return option.text === defaultValue ? { ...option, selected: true } : option
  })
  return (
    <div>
      <StyledLabel htmlFor={name}>
        {label}
        <StyledDropdown
          id={name}
          name={name}
          {...register(name, validation)}
          disabled={disabled}
          value={options?.find((option: HTMLOptionElement) => option?.selected)?.name}
        >
          {options.map((option: HTMLOptionElement, i: number) => {
            return (
              <StyledOption key={i} value={option.text} disabled={option.disabled}>
                {option.title}
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
