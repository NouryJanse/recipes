import React, { ReactElement } from 'react'
import StyledFieldContainer from './styled'

interface FieldContainerProps {
  children: JSX.Element
}

const FieldContainer: React.FC<FieldContainerProps> = ({ children }): ReactElement => {
  return <StyledFieldContainer>{children}</StyledFieldContainer>
}

export default FieldContainer
