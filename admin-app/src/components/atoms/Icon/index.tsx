import React, { ReactElement, ReactNode } from 'react'
import StyledIcon from './styled'

interface IconProps {
  iconElement: ReactNode
  classes?: string
}

const Icon: React.FC<IconProps> = ({ iconElement, classes }): ReactElement => {
  return <StyledIcon className={classes}>{iconElement}</StyledIcon>
}

Icon.defaultProps = {
  classes: '',
}

export default Icon
