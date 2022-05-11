import { ImageStyle } from './styles'
import classNames from 'classnames'

const ImageComponent = ({
  src,
  alt = '',
  width,
  height,
}: {
  src: string
  alt?: string
  width?: number
  height?: number
}) => {
  const dimensions = {
    ...((width === undefined || width > 0) && { width }),
    ...((height === undefined || height > 0) && { height }),
  }
  const otherClasses = classNames({
    'w-full': width === 0,
    'h-auto': height === 0,
  })
  if (dimensions.hasOwnProperty('width') || dimensions.hasOwnProperty('height')) {
    return <ImageStyle src={src} alt={alt} {...dimensions} {...otherClasses} />
  } else {
    return <ImageStyle src={src} alt={alt} {...dimensions} />
  }
}

export default ImageComponent
