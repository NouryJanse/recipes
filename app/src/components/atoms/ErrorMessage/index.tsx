import React, { ReactElement, ReactNode } from 'react'
import StyledErrorMessage from './styled'

type ErrorMessageProps = {
  errorObject: errorObject
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorObject }): ReactElement => {
  return <StyledErrorMessage>{errorObject.message}</StyledErrorMessage>
}

export default ErrorMessage
