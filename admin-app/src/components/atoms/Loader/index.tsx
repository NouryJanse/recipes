import { Ping } from '@uiball/loaders'
import React from 'react'

const Loader: React.FC = ({ size, speed }: { size?: number; speed?: number }): JSX.Element => {
  return <Ping size={size} speed={speed} color="black" />
}

Loader.defaultProps = {
  size: 28,
  speed: 2,
}

export default Loader
