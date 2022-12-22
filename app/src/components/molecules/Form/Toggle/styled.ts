import styled from 'styled-components'

export const StyledInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`

export const StyledSpan = styled.div`
  content: '';
  position: absolute;
  top: 2px;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 45px;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  margin-left: 2px;
`

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 85px;
  height: 34px;
  background: grey;
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s;
`
