import React, { ReactElement } from 'react'
import StyledFieldContainer from './styled'

interface FieldContainerProps {
  children: JSX.Element
  classes?: string
}

const FieldContainer: React.FC<FieldContainerProps> = ({ children, classes }): ReactElement => {
  return <StyledFieldContainer className={classes}>{children}</StyledFieldContainer>
}

export default FieldContainer
