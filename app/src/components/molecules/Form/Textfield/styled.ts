import tw from 'tailwind-styled-components'

interface TWStyledInputParameter {
  $isEditing: boolean
}

export const InputStyle = tw.input`
  flex
  text-black
  p-2
  border-1
  rounded-sm
  focus:pl-3
  transition-all

  ${(p: TWStyledInputParameter): string => (p.$isEditing ? 'border-blue' : 'border-transparent')}
`

export const FieldRowStyle = tw.div`
  max-width: 320px;
`

export const LabelStyle = tw.label`
  margin-bottom: 8px;
  color: black;
`
