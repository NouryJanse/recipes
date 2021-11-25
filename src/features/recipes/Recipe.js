import styled from 'styled-components';

const StyledRecipe = styled.div`
    width: 100px;
    height: 100px;
    background-color: grey;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const logSomething = () =>  {
    console.log(`Recipe ${Date.now()}`);
}

export default function Recipe() {
    return (
        <StyledRecipe onClick={() => logSomething()}>Click me and view the logs!</StyledRecipe>
    )
}

// View component here