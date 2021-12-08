import Button from './Button';
import { removeRecipeById } from '../redux/reducers/recipes/recipeSlice';
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
        <div>
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
        </div>
    )
}

export default Recipe;