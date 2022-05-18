import React, { ReactElement } from 'react'
import ButtonStyle from './styled'

type ButtonProps = {
  type: 'submit' | 'reset' | 'button'
  onClick?: () => void
  disabled?: boolean
  label?: string | JSX.Element
  classes?: string
  children?: JSX.Element
  buttonStyle?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  label,
  classes,
  children,
  buttonStyle,
}): ReactElement => {
  return (
    <ButtonStyle
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      $primary={buttonStyle === 'primary'}
      $secondary={buttonStyle === 'secondary'}
    >
      {children || label}
    </ButtonStyle>
  )
}

Button.defaultProps = {
  onClick: Function,
  disabled: false,
  label: '',
  classes: '',
  children: undefined,
  buttonStyle: 'primary',
}

export default Button
