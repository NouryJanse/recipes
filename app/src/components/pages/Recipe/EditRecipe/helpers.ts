// this helper finds and returns the textual version of the key of a select option entry
// unit test needed

const courseName = (courseValue: string, options: Option[]): string => {
  const currentOption = options.find((option) => {
    if (option.value && option.value === courseValue) return option
    return null
  })
  if (currentOption?.text) return currentOption.text
  return ''
}

export default courseName
