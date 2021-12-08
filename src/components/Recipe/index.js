import { removeRecipeById } from '../../redux/reducers/recipes/recipeSlice';
import { RecipeContainer } from './styled';
import { Button } from '../index';
import { useDispatch } from 'react-redux';;

const Recipe = (data) => {
    const recipe = data.recipe;
    const dispatch = useDispatch();
        
    const onDelete = (recipeId) => {
        if (isNaN(recipeId)) return;
        
        dispatch(
            removeRecipeById(recipeId)
        );
    }

    return (
        <RecipeContainer>
            <h2>
                {recipe.title}
            </h2>

            {
                recipe.description &&
                <p>
                    {recipe.description}
                </p>
            }

            <Button
                label={"Delete"}
                onClick={() => onDelete(recipe.id)}
            />
        </RecipeContainer>
    )
}

export default Recipe;