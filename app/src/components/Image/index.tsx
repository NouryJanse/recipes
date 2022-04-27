import { ImageStyle } from './styles'

const ImageComponent = ({ src, alt = '' }: { src: string; alt?: string }) => {
  return <ImageStyle src={src} alt={alt} />
}

export default ImageComponent
