import classNames from 'classnames'
import React, { ReactElement } from 'react'
import ImageStyle from './styles'

type ImageComponentProps = {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  rounded?: boolean
  classes?: string
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  rounded,
  classes,
}): ReactElement => {
  const dimensions = {
    ...((width === undefined ||
      width > 0 ||
      (typeof width === 'string' && width.includes('%'))) && { width }),
    ...((height === undefined ||
      height > 0 ||
      (typeof height === 'string' && height.includes('%'))) && { height }),
  }
  const otherClasses = classNames(
    {
      'w-full': width === 0,
      'h-auto': height === 0,
    },
    classes,
  )

  /* object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute; */

  if (dimensions.width || dimensions.height) {
    return <ImageStyle src={src} alt={alt} {...dimensions} {...otherClasses} />
  }
  return <ImageStyle src={src} alt={alt} {...dimensions} $rounded={rounded} />
}

ImageComponent.defaultProps = {
  width: undefined,
  height: undefined,
  rounded: false,
  classes: '',
}

export default ImageComponent
