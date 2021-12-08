import styled from 'styled-components';

export const ButtonStyle = styled.button`
    height: 50px;
    background-color: #0d6efd;
    padding: 8px;
    border-radius: 4px;
    border: 2px solid transparent;
    text-decoration: none;
    outline: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 200ms ease-in-out;

    &:focus {
        outline: none;
        border: 2px solid blue;
        margin: 0;
    }

    &:hover {
        background-color: #0352c7;
    }
`;