import React, { ReactElement, ReactNode } from 'react'
import StyledIcon from './styled'

interface IconType {
  iconElement: ReactNode
}

const Icon: React.FC<IconType> = ({ iconElement }): ReactElement => {
  return <StyledIcon>{iconElement}</StyledIcon>
}

export default Icon
