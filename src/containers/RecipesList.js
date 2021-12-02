import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/reducers/recipes/recipeSlice';
import Recipe from '../components/Recipe';

const RecipesList = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipeSlice.data.recipes);
    
    useEffect(() => { 
        dispatch(fetchRecipes());
    }, []);

    return (
        <div>
            List of recipes
            {recipes.map((recipe, i) => {
                return <Recipe key={i} recipe={recipe} />
            })}
        </div>
    )
}

export default RecipesList;