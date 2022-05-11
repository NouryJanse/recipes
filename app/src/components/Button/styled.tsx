import tw from 'tailwind-styled-components'

interface TWStyledButtonParameter {
  $primary: boolean
  $secondary: boolean
}

export const ButtonStyle = tw.button`
  flex
  outline-none  
  align-middle
  justify-center
  p-2
  mt-2
  mr-1
  mb-2
  ml-0
  rounded

  no-underline
  border-2
  border-solid
  border-transparent  
  transition-colors
  
  focus:border-2
  focus:border-solid
  focus:border-blue

  ${(p: TWStyledButtonParameter) => (p.$primary ? 'bg-blue text-white hover:bg-blueDark' : '')}
  ${(p: TWStyledButtonParameter) =>
    p.$secondary ? 'bg-white text-blue hover:bg-blueDark hover:text-white' : ''}
`
