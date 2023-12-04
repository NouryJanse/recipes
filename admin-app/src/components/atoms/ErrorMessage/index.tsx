import React, { ReactElement } from 'react'

type ErrorMessageProps = {
  errorObject: errorObject
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorObject }): ReactElement => {
  return (
    <p className="italic text-red" data-testid="error-message">
      {errorObject.message}
    </p>
  )
}

export default ErrorMessage
