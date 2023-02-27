import { ReactElement, useState } from 'react'
import Select, { ActionMeta, GroupBase, PropsValue } from 'react-select'

import ErrorMessage from '../../../atoms/ErrorMessage'
import { StyledLabel } from './styled'

type AutoCompleteProps = {
  name: string
  labelText: string
  options: Option[] | undefined
  handleOnChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void
  setRef?: any
  errors?: errorObject
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  handleOnChange,
  setRef,
  name,
  labelText,
  errors,
}): ReactElement => {
  return (
    <div>
      <StyledLabel htmlFor={name}>
        {labelText}
        <Select
          ref={(ref): void => {
            if (ref !== null) setRef(ref)
          }}
          options={options}
          onChange={(option: Option | null, actionMeta: ActionMeta<Option>): void => handleOnChange(option, actionMeta)}
          escapeClearsValue
          isClearable
        />
      </StyledLabel>
      {errors && <ErrorMessage errorObject={errors} />}
    </div>
  )
}

export default AutoComplete
