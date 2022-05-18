import classNames from 'classnames'
import React, { ReactElement } from 'react'
import ImageStyle from './styles'

type ImageComponentProps = {
  src: string
  alt: string
  width?: number
  height?: number
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height,
}): ReactElement => {
  const dimensions = {
    ...((width === undefined || width > 0) && { width }),
    ...((height === undefined || height > 0) && { height }),
  }
  const otherClasses = classNames({
    'w-full': width === 0,
    'h-auto': height === 0,
  })
  if (dimensions.width || dimensions.height) {
    return <ImageStyle src={src} alt={alt} {...dimensions} {...otherClasses} />
  }
  return <ImageStyle src={src} alt={alt} {...dimensions} />
}

ImageComponent.defaultProps = {
  width: undefined,
  height: undefined,
}

export default ImageComponent
