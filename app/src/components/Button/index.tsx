import React, { ReactElement } from 'react'
import ButtonStyle from './styled'

type ButtonProps = {
  type: 'submit' | 'reset' | 'button'
  onClick?: (e: Event) => void
  disabled?: boolean
  label?: string | JSX.Element
  classes?: string
  children?: JSX.Element
  buttonStyle?: 'primary' | 'secondary'
  noedge?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  label,
  classes,
  children,
  buttonStyle,
  noedge,
}): ReactElement => {
  return (
    <ButtonStyle
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      $primary={buttonStyle === 'primary'}
      $secondary={buttonStyle === 'secondary'}
      $noedge={noedge}
    >
      {children || label}
    </ButtonStyle>
  )
}

Button.defaultProps = {
  onClick: (): boolean => {
    return true
  },
  disabled: false,
  label: '',
  classes: '',
  children: undefined,
  buttonStyle: 'primary',
  noedge: false,
}

export default Button
