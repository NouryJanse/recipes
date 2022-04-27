import tw from 'tailwind-styled-components'

interface IBtn {}

export const ButtonStyle = tw.button<IBtn>`
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

  bg-blue
  text-white

  no-underline
  border-2
  border-solid
  border-transparent  
  transition-colors
  
  hover:bg-blueDark

  focus:outline-none
  focus:m-0
  focus:border-2
  focus:border-solid
`
