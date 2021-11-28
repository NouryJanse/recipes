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

export default function Recipe(data) {
    const recipe = data.recipe;
    
    return (
        <StyledRecipe onClick={() => logSomething()}>Click me and view the logs! {recipe.title}</StyledRecipe>
    )
}

// View component here