import { ReactElement, useState } from 'react'
import Select, { ActionMeta, GroupBase, PropsValue } from 'react-select'

type AutoCompleteProps = {
  options: any
  handleOnChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void
  setRef: any
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, handleOnChange, setRef }): ReactElement => {
  return (
    <div>
      <Select
        ref={(ref): void => {
          if (ref !== null) setRef(ref)
        }}
        options={options}
        onChange={(option: Option | null, actionMeta: ActionMeta<Option>): void => handleOnChange(option, actionMeta)}
        escapeClearsValue
        isClearable
      />
    </div>
  )
}

export default AutoComplete
