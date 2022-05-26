import React, { ReactElement, ReactNode } from 'react'
import StyledErrorMessage from './styled'

type ErrorMessageProps = {
  message: ReactNode | string | boolean
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }): ReactElement => {
  return <StyledErrorMessage>{message}</StyledErrorMessage>
}

export default ErrorMessage
