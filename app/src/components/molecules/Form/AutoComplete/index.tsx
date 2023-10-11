import React, { ReactElement } from 'react'
import Select, { ActionMeta } from 'react-select'
import ErrorMessage from '../../../atoms/ErrorMessage'
import StyledLabel from './styled'

type AutoCompleteProps = {
  name: string
  labelText: string
  options: Option[] | undefined
  handleOnChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void
  setRef: any
  errors: errorObject
  defaultValue?: Option
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  name,
  labelText,
  options,
  handleOnChange,
  setRef,
  errors,
  defaultValue,
}): ReactElement => {
  return (
    <StyledLabel htmlFor={name} role="caption">
      {labelText}
      {setRef ? (
        <Select
          defaultValue={defaultValue ? defaultValue : undefined}
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
        <Select
          defaultValue={defaultValue ? defaultValue : undefined}
          options={options}
          onChange={handleOnChange}
          escapeClearsValue
          isClearable
          className="pt-2"
        />
      )}
      {errors && <ErrorMessage errorObject={errors} />}
    </StyledLabel>
  )
}

export default AutoComplete
