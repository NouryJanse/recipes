import styled from 'styled-components'

interface TWStyledInputParameter {
  $isEditing: boolean
}

export const InputStyle = styled.input`
  display: flex
  color: black;
  padding: 8px;
  border: 1px solid;
  border-radius: 4px;
  transition: all 1s ease-out;
  height: 40px;

  &:hover {
    padding-left: 12px;
  }

  ${(p: TWStyledInputParameter): string => (p.$isEditing ? 'border-color: blue' : 'border-color: transparent')}
`

export const FieldRowStyle = styled.div`
  max-width: 320px;
`

export const LabelStyle = styled.label`
  display: block;
  mb-2px;
  color: black;
`
