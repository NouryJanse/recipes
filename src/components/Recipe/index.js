import { removeRecipeById } from '../../redux/reducers/recipes/recipeSlice';
import { RecipeContainer } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Button
} from '../index';

const Recipe = (data) => {
    let recipe = data.recipe;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let params = useParams();
    const recipes = useSelector((state) => state.recipeSlice.data.recipes);

    if (params.recipeId) {
        recipe = recipes.find(recipe => {
            return recipe.id === params.recipeId;
        });
    }

    const onDelete = async (recipeId) => {
        if (!recipeId) return;
        
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

            <Link 
                to={`/recipes/${recipe.id}/edit`}
            >
                Edit
            </Link>

            <br/>

            <Button
                label={"Delete"}
                onClick={() => onDelete(recipe.id)}
            />

            <Link 
                to={`/recipes`}
            >
                Back to home
            </Link>
        </RecipeContainer>
    )
}

export default Recipe;