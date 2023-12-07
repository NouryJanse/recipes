import clsx from 'clsx'
import React, { ReactElement } from 'react'

type ImageComponentProps = {
  src: string
  alt: string
  width?: number
  height?: number
  classes?: string
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, width, height, classes }): ReactElement => {
  const dimensions = {
    ...((width === undefined || width > 0) && { width }),
    ...((height === undefined || height > 0) && { height }),
  }
  const otherClasses = clsx(
    {
      'w-full': width === 0,
      'h-auto': height === 0,
    },
    classes,
  )

  if (dimensions.width || dimensions.height) {
    return <img src={src} alt={alt} {...dimensions} className={otherClasses} loading="lazy" decoding="async" />
  }
  // @ts-ignore:next-line
  return (
    <img
      className="flex object-contain"
      src={src}
      alt={alt}
      {...dimensions}
      // $rounded={rounded}
    />
  )
}

ImageComponent.defaultProps = {
  width: undefined,
  height: undefined,
  // rounded: false,
  classes: '',
}

export default ImageComponent
