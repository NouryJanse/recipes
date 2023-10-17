import React, { ReactElement } from 'react'
import StyledErrorMessage from './styled'

type ErrorMessageProps = {
  errorObject: errorObject
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorObject }): ReactElement => {
  return <StyledErrorMessage data-testid="error-message">{errorObject.message}</StyledErrorMessage>
}

export default ErrorMessage
