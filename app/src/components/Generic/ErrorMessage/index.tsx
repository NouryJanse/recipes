import { ReactNode } from 'react'
import { StyledErrorMessage } from './styled'

interface ErrorMessageType {
  message?: ReactNode | string | boolean
}

const ErrorMessage = ({ message }: ErrorMessageType) => {
  return <StyledErrorMessage>{message}</StyledErrorMessage>
}

export default ErrorMessage
