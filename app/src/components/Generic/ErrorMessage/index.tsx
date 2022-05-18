import React, { ReactElement, ReactNode } from 'react'
import StyledErrorMessage from './styled'

type ErrorMessageType = {
  message: ReactNode | string | boolean
}

const ErrorMessage: React.FC<ErrorMessageType> = ({ message }): ReactElement => {
  return <StyledErrorMessage>{message}</StyledErrorMessage>
}

export default ErrorMessage
