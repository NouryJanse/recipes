import React, { ReactElement, useEffect } from 'react'

type ButtonProps = {
  type: 'submit' | 'reset' | 'button'
  onClick?: any
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
  label,
  classes,
  children,
  buttonStyle,
  noedge,
  fullwidth,
  disabled,
}): ReactElement => {
  useEffect(() => {
    console.log(buttonStyle, noedge, fullwidth)
  }, [])

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${classes} flex outline-none align-middle justify-center p-2 rounded no-underline border-1 border-solid border-transparent transition-colors focus:border-solid focus:border-blue h-fit`}
      // $primary={buttonStyle === 'primary'}
      // $secondary={buttonStyle === 'secondary'}
      // $tertiary={buttonStyle === 'tertiary'}
      // $noedge={noedge}
      // $fullwidth={fullwidth}
      // $disabled={disabled}
    >
      {children || label}
    </button>
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
