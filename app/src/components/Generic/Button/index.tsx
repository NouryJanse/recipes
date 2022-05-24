import React, { ReactElement } from 'react'
import ButtonStyle from './styled'

type ButtonProps = {
  type: 'submit' | 'reset' | 'button'
  onClick?: (e: Event) => void
  disabled?: boolean
  label?: string | JSX.Element
  classes?: string
  children?: JSX.Element
  buttonStyle?: 'primary' | 'secondary' | 'tertiary'
  noedge?: boolean
  fullwidth?: boolean
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
  fullwidth,
}): ReactElement => {
  return (
    <ButtonStyle
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      $primary={buttonStyle === 'primary'}
      $secondary={buttonStyle === 'secondary'}
      $tertiary={buttonStyle === 'tertiary'}
      $noedge={noedge}
      $fullwidth={fullwidth}
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
  fullwidth: false,
}

export default Button
