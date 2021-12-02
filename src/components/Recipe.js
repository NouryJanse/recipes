import {Fragment} from 'react';
import Button from './Button';

const logSomething = () =>  {
    console.log(`Recipe ${Date.now()}`);
}

export default function Recipe(data) {
    const recipe = data.recipe;
    const buttonVal = `Click me and view the logs!`;

    return (
        <Fragment>
            <h1>{recipe.title}</h1>
            <Button
                label={buttonVal}
                onClick={() => logSomething()}
            />
        </Fragment>
    )
}
