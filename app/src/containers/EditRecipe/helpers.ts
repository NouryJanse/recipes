const courseName = (courseValue: string, options: Option[]): string => {
  const currentOption = options.find((option) => {
    if (option.value && option.value === courseValue) return option
    return null
  })
  if (currentOption) return currentOption.text
  return ''
}

export default courseName
