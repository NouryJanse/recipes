import React, { ReactElement } from 'react'
import Select, { ActionMeta } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import ErrorMessage from '../../../atoms/ErrorMessage'
import styled from 'styled-components'

const StyledLabel = styled.label`
  color: black;
  position: relative;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  min-width: 216px;
`

type AutoCompleteProps = {
  name: string
  labelText: string
  options: Option[] | undefined
  handleOnChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void
  setRef: any
  errors: errorObject
  classes?: string
  defaultValue?: Option
  isCreatable?: boolean
  placeholder?: string
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  name,
  labelText,
  options,
  handleOnChange,
  setRef,
  errors,
  defaultValue,
  classes,
  isCreatable,
  placeholder,
}): ReactElement => {
  if (!placeholder) placeholder = 'Select...'

  if (isCreatable) {
    return (
      <StyledLabel htmlFor={name} role="caption" className={classes}>
        {labelText}
        <CreatableSelect
          className="pt-2"
          defaultValue={defaultValue ? defaultValue : undefined}
          ref={(ref): void => {
            if (ref !== null) setRef(ref)
          }}
          options={options}
          onChange={handleOnChange}
          isClearable={true}
          escapeClearsValue
          placeholder={placeholder}
        />
      </StyledLabel>
    )
  }

  return (
    <StyledLabel htmlFor={name} role="caption" className={classes}>
      {labelText}
      {setRef ? (
        <Select
          className="pt-2"
          defaultValue={defaultValue ? defaultValue : undefined}
          ref={(ref): void => {
            if (ref !== null) setRef(ref)
          }}
          options={options}
          onChange={handleOnChange}
          escapeClearsValue
          isClearable
        />
      ) : (
        <Select
          className="pt-2"
          defaultValue={defaultValue ? defaultValue : undefined}
          options={options}
          onChange={handleOnChange}
          escapeClearsValue
          isClearable
        />
      )}
      {errors && <ErrorMessage errorObject={errors} />}
    </StyledLabel>
  )
}

export default AutoComplete
