import { ButtonStyle } from './styled'

const Button = ({
  type,
  onClick,
  disabled = false,
  label,
}: {
  type?: 'submit' | 'reset' | 'button'
  onClick?: any
  disabled?: boolean
  label: string | JSX.Element
}) => {
  return (
    <ButtonStyle type={type} disabled={disabled} onClick={onClick}>
      {label}
    </ButtonStyle>
  )
}

export default Button
