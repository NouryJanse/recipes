import { Ping } from '@uiball/loaders'

const Loader = ({ size, speed }: { size: number; speed: number }): JSX.Element => {
  return <Ping size={size} speed={speed} color="black" />
}

export default Loader
