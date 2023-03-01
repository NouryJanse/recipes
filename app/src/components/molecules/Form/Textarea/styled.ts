import styled from 'styled-components'

export const StyledTextArea = styled.textarea`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  color: black;
  border: 1px solid #0d6efd;
  transition: padding 200ms ease-in-out;
  min-height: 240px;
  width: 99%;

  &:focus {
    padding-left: 16px;
  }
`

export const StyledLabel = styled.label`
  color: black;
`

export const FieldRowStyle = styled.div`
  max-width: 560px;
`
