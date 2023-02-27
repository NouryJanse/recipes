import { ReactElement, useState } from 'react'
import Select, { ActionMeta, GroupBase, PropsValue } from 'react-select'

import ErrorMessage from '../../../atoms/ErrorMessage'
import { StyledLabel } from './styled'

type AutoCompleteProps = {
  name: string
  label: string
  options: Option[] | undefined
  handleOnChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void
  // @ts-ignore:next-line
  setRef: any
  errors: string | boolean
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  handleOnChange,
  setRef,
  name,
  label,
  errors,
}): ReactElement => {
  return (
    <div>
      <StyledLabel htmlFor={name}>
        {label}
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
      {errors && <ErrorMessage message={errors} />}
    </div>
  )
}

export default AutoComplete
