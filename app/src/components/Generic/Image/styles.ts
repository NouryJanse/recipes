import tw from 'tailwind-styled-components'

interface TWImageStyle {
  $rounded: boolean
}

const ImageStyle = tw.img`
  flex
  object-contain

  ${(p: TWImageStyle): string => (p.$rounded ? 'rounded-md' : '')}
`

export default ImageStyle
