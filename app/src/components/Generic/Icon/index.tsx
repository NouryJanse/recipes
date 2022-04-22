import { ReactNode } from 'react'
import { StyledIcon } from './styled'

interface IconType {
  iconElement: ReactNode
}

const Icon = ({ iconElement }: IconType) => {
  return <StyledIcon>{iconElement}</StyledIcon>
}

export default Icon
