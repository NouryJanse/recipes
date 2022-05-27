import React, { ReactElement, ReactNode } from 'react'
import StyledBadge from './styled'

type BadgeProps = {
  text: ReactNode | string
  classes?: string
}

const Badge: React.FC<BadgeProps> = ({ text, classes }): ReactElement => {
  return <StyledBadge className={classes}>{text}</StyledBadge>
}

Badge.defaultProps = {
  classes: '',
}

export default Badge
