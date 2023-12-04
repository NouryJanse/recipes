import React, { ReactElement } from 'react'
import StyledFieldContainer from './styled'

interface FieldContainerProps {
  children: JSX.Element
  classes?: string
}

const FieldContainer: React.FC<FieldContainerProps> = ({ children, classes }): ReactElement => {
  return <div className={`${classes} mb-2`}>{children}</div>
}

export default FieldContainer
