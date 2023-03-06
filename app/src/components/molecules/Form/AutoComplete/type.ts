// @ts-nocheck

type AutoCompleteProps = {
  name: string
  labelText: string
  options: Option[] | undefined
  handleOnChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void
  setRef: any
  errors: errorObject
}

export default AutoCompleteProps
