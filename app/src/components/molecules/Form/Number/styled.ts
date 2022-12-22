import styled from 'styled-components'

export const InputStyle = styled.input`
  display: flex;
  color: black;
  border: 1px solid #0d6efd;
  padding: 8px;
  transition: padding 200ms ease-in-out;
  width: 99%;

  &:focus {
    padding-left: 16px;
  }
`

export const FieldRowStyle = styled.div`
  width: 320px;
`

export const LabelStyle = styled.label`
  margin-bottom: 8px;
  color: black;
`
