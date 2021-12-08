import { removeRecipeById } from '../../redux/reducers/recipes/recipeSlice';
import { RecipeContainer } from './styled';
import { Button } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const Recipe = (data) => {
    let recipe = data.recipe;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let params = useParams();
    const recipes = useSelector((state) => state.recipeSlice.data.recipes);

    if (params.recipeId) {
        recipe = recipes.find(recipe => {
            return recipe.id === Number.parseInt(params.recipeId);
        });
    }

    const onDelete = async (recipeId) => {
        if (isNaN(recipeId)) return;
        
        await dispatch(
            removeRecipeById(recipeId)
        );

        navigate('/');
    }

    if (!recipe) return (<p>Error</p>);

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

            {/* {!params.recipeId &&
                <Link 
                    to={`recipes/${recipe.id}`}
                >
                    Edit
                </Link>
            } */}
        </RecipeContainer>
    )
}

export default Recipe;