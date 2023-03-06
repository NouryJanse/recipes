import React, { ReactElement } from 'react'
import Select from 'react-select'
import ErrorMessage from '../../../atoms/ErrorMessage'
import StyledLabel from './styled'
import AutoCompleteProps from './type'

const AutoComplete: React.FC<AutoCompleteProps> = ({
  name,
  labelText,
  options,
  handleOnChange,
  setRef,
  errors,
}): ReactElement => {
  return (
    <StyledLabel htmlFor={name} role="caption">
      {labelText}
      {setRef ? (
        <Select
          ref={(ref): void => {
            if (ref !== null) setRef(ref)
          }}
          options={options}
          onChange={handleOnChange}
          escapeClearsValue
          isClearable
          className="pt-2"
        />
      ) : (
        <Select options={options} onChange={handleOnChange} escapeClearsValue isClearable className="pt-2" />
      )}
      {errors && <ErrorMessage errorObject={errors} />}
    </StyledLabel>
  )
}

export default AutoComplete
