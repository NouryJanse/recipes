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

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, width, height, rounded, classes }): ReactElement => {
  const dimensions = {
    ...((width === undefined || width > 0) && { width }),
    ...((height === undefined || height > 0) && { height }),
  }
  const otherClasses = classNames(
    {
      'w-full': width === 0,
      'h-auto': height === 0,
    },
    classes,
  )

  if (dimensions.width || dimensions.height) {
    return <ImageStyle src={src} alt={alt} {...dimensions} {...otherClasses} loading="lazy" decoding="async" />
  }
  // @ts-ignore:next-line
  return <ImageStyle src={src} alt={alt} {...dimensions} $rounded={rounded} />
}

ImageComponent.defaultProps = {
  width: undefined,
  height: undefined,
  rounded: false,
  classes: '',
}

export default ImageComponent
