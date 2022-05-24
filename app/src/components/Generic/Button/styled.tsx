import tw from 'tailwind-styled-components'

interface TWStyledButtonParameter {
  $primary: boolean
  $secondary: boolean
  $tertiary: boolean
  $noedge: boolean
  $fullwidth: boolean
}

const ButtonStyle = tw.button`
  flex
  outline-none  
  align-middle
  justify-center
  p-2
  rounded

  no-underline
  border-2
  border-solid
  border-transparent  
  transition-colors
  
  focus:border-2
  focus:border-solid
  focus:border-blue

  ${(p: TWStyledButtonParameter): string => (p.$fullwidth ? 'w-full' : '')}

  ${(p: TWStyledButtonParameter): string =>
    p.$noedge ? 'bg-white/[.5] text-white hover:bg-white/[1.0] hover:text-black' : ''}
    
  ${(p: TWStyledButtonParameter): string =>
    p.$primary && !p.$noedge ? 'bg-blue text-white hover:bg-blueDark' : ''}
  ${(p: TWStyledButtonParameter): string =>
    p.$secondary && !p.$noedge ? 'bg-white text-blue hover:bg-blueDark hover:text-white' : ''}
  ${(p: TWStyledButtonParameter): string =>
    p.$tertiary && !p.$noedge
      ? 'bg-green-400 text-gray-600 font-bold hover:bg-green-500 hover:text-white focus:border-green-500'
      : ''}
`

export default ButtonStyle
