import { useDispatch } from 'react-redux';
import Recipe from '../components/Recipe';
import { fetchRecipes } from '../redux/reducers/recipeSlice';

const recipes = [];


const RecipesList = () => {
    const dispatch = useDispatch();
    dispatch(fetchRecipes());

    return (
        <div>
            {recipes.map((recipe, i) => {
                return <Recipe key={i} recipe={recipe} />
            })}
            Recipeslist
        </div>
    )
}

export default RecipesList;