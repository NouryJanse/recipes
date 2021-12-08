import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/reducers/recipes/recipeSlice';
import { Outlet } from 'react-router-dom';
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
        <div className="col-xs-12 col-sm-6">
            {recipes.map((recipe, i) => {
                return (
                    <Recipe 
                        key={i} 
                        recipe={recipe}
                    />
                )
            })}
            <h1>Detail</h1>
            <hr/>
            <Outlet />
        </div>
    )
}

export default RecipesList;