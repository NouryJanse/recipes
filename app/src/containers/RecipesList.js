import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../redux/reducers/recipes/recipeSlice';
import { Outlet, Link, useParams } from 'react-router-dom';
import { useInterval } from '../polling';

const RecipesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipeSlice.data.recipes);
  let params = useParams();

  useEffect(() => {
    if (!recipes.length) {
      dispatch(getRecipes());
    }
  }, [dispatch, recipes]);

  useInterval(() => {
    dispatch(getRecipes());
  }, 5000);

  return (
    <div>
      <div className="">
        {!params.recipeId ? (
          <div>
            {recipes.map((recipe, i) => {
              return (
                <Link key={i} to={`/recipes/${recipe.id}`}>
                  <p>{recipe.name}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesList;
