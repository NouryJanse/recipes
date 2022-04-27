import { ButtonStyle } from './styled'

const Button = ({
  type,
  onClick,
  disabled = false,
  label,
  classNames = '',
}: {
  type?: 'submit' | 'reset' | 'button'
  onClick?: any
  disabled?: boolean
  label: string | JSX.Element
  classNames?: string
}) => {
  return (
    <ButtonStyle type={type} disabled={disabled} onClick={onClick} className={classNames}>
      {label}
    </ButtonStyle>
  )
}

export default Button
