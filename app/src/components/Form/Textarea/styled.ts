import styled from 'styled-components'

export const StyledTextArea = styled.textarea`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  color: black;
  border: 1px solid #0d6efd;
  transition: padding 200ms ease-in-out;
  width: 99%;
  min-height: 80px;

  &:focus {
    padding-left: 16px;
  }
`

export const StyledLabel = styled.label`
  color: black;
`
