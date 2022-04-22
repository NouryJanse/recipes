import { StyledErrorMessage } from './styled'

interface ErrorMessageType {
  message?: any
}

const ErrorMessage = ({ message }: ErrorMessageType) => {
  return <StyledErrorMessage>{message}</StyledErrorMessage>
}

export default ErrorMessage
