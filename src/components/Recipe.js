import Button from './Button';

const logSomething = () =>  {
    console.log(`Recipe ${Date.now()}`);
}

export default function Recipe(data) {
    const recipe = data.recipe;
    const buttonVal = `Click me and view the logs! ${recipe.title}`;
    
    return (
        <Button
            content={buttonVal}
            onClick={() => logSomething()}
        />
    )
}
