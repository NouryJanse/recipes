import { ButtonStyle } from './styled'

const Button = ({
  type,
  onClick,
  disabled = false,
  label,
  classes = '',
  children,
  buttonStyle = 'primary',
}: {
  type: 'submit' | 'reset' | 'button'
  onClick?: any
  disabled?: boolean
  label?: string | JSX.Element
  classes?: string
  children?: JSX.Element
  buttonStyle?: 'primary' | 'secondary'
}) => {
  return (
    <ButtonStyle
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      $primary={buttonStyle === 'primary'}
      $secondary={buttonStyle === 'secondary'}
    >
      {children ? children : label}
    </ButtonStyle>
  )
}

export default Button
