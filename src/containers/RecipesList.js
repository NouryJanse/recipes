
import Recipe from '../components/Recipe';

const recipes = [{title: "Tomato soup"},{"title": "Pasta di pasta"},{"title": "Curry"}];

const RecipesList = () => {
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