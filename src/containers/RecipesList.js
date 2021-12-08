import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/reducers/recipes/recipeSlice';
import { Outlet, Link, useParams } from 'react-router-dom';
import { 
    Recipe,
} from '../components';

const RecipesList = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipeSlice.data.recipes);
    let params = useParams();
    
    useEffect(() => { 
        if (!recipes.length) {
            dispatch(fetchRecipes());
        }
    }, [dispatch]);

    return (
        <div> 
            <div className="">
                {!params.recipeId ?
                    <div>                
                        {recipes.map((recipe, i) => {
                            return (
                                <Link key={i} to={`/recipes/${recipe.id}`}>
                                    <p>{recipe.title}</p>
                                </Link>
                            )
                        })
                        }
                    </div>
                    :
                    <div>                
                        <Outlet />
                    </div>
                }

            </div>
        </div>
    )
}

export default RecipesList;