import styled from 'styled-components';

const ButtonStyle = styled.div`
    width: 100px;
    height: 100px;
    background-color: grey;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = (props) => {
    const { content, onClick } = props;

    return <ButtonStyle onClick={onClick}>{content}</ButtonStyle>
}

export default Button;