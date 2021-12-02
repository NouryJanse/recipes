import styled from 'styled-components';

const ButtonStyle = styled.button`
    height: 50px;
    background-color: #0d6efd;
    padding: 8px;
    border-radius: 4px;
    border: 0px;
    text-decoration: none;
    outline: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
        outline: none;
        border: 2px solid blue;
        margin: 0;
    }    
`;

const Button = (props) => {
    const {
        onClick, 
        disabled = false,
        label = '',
    } = props;

    return (
        <ButtonStyle 
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </ButtonStyle>
    )
}

export default Button;