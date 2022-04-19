import { ButtonStyle } from './styled'

const Button = ({
  onClick,
  disabled = false,
  label,
}: {
  onClick?: any
  disabled?: boolean
  label: string
}) => {
  return (
    <ButtonStyle disabled={disabled} onClick={onClick}>
      {label}
    </ButtonStyle>
  )
}

export default Button
