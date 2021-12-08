import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/reducers/recipes/recipeSlice';
import { 
    Recipe,
} from '../components';

const RecipesList = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipeSlice.data.recipes);
    
    useEffect(() => { 
        dispatch(fetchRecipes());
    }, [dispatch]);

    return (
        <div>
            {recipes.map((recipe, i) => {
                return <Recipe key={i} recipe={recipe} />
            })}
        </div>
    )
}

export default RecipesList;