import { StyledErrorMessage } from './styled';

const ErrorMessage = ({
    message = ""
}) => {
    return (
        <StyledErrorMessage>
            {message}
        </StyledErrorMessage>
    )
}

export default ErrorMessage;