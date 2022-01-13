import { StyledDropdown, StyledOption, StyledLabel } from './styled';
import { useState, useEffect } from 'react';

const Dropdown = ({ label, name, validation, register, disabled, options, defaultValue }) => {
  options = options.map((option) => {
    return option.name === defaultValue ? { ...option, selected: true } : option;
  });
  return (
    <div>
      <StyledLabel htmlFor={name}>
        {label}
        <StyledDropdown
          id={name}
          name={name}
          {...register(name, validation)}
          disabled={disabled}
          value={options?.find((option) => option?.selected)?.name}
        >
          {options.map((option, i) => {
            return (
              <StyledOption key={i} value={option.name} disabled={option.disabled}>
                {option.title}
              </StyledOption>
            );
          })}
        </StyledDropdown>
        <svg>
          <use xlinkHref="#select-arrow-down"></use>
        </svg>
      </StyledLabel>
      <svg className="sprites">
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>
    </div>
  );
};

export default Dropdown;
