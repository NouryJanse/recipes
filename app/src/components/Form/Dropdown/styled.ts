import styled from 'styled-components'

export const StyledDropdown = styled.select`
  display: flex;
  appearance: none;
  padding: 7px 40px 7px 12px;
  width: 100%;
  border: 1px solid #0d6efd;
  border-radius: 5px;
  background: white;
  color: black;
  box-shadow: 0 1px 3px -2px #9098a9;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  transition: all 150ms ease;
  transition: padding 200ms ease-in-out;

  &:focus {
    padding-left: 16px;
  }
`

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? 'lightgrey' : 'black')};
`

export const StyledLabel = styled.label`
  color: black;
  position: relative;
`
