import styled from 'styled-components'

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
  `

export const FieldRowStyle = styled.div`
    max-width: 320px;
`

export const LabelStyle = styled.label`
    display: block;
    margin-bottom: 4px;
    color: black;
`
