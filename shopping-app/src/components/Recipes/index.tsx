import type { FunctionComponent } from "preact";

type RecipesProps = {
  recipes: any[];
};

const Recipes: FunctionComponent<RecipesProps> = ({ recipes }) => {
  return (
    <div className="container">
      <h2>Recipes</h2>

      {recipes && recipes.length > 0 ? (
        recipes.map((recipe: any) => {
          return <a href={`recipes/${recipe.id}`}>{recipe.name}</a>;
        })
      ) : (
        <p>Unfortunately, there are no recipes yet...</p>
      )}
    </div>
  );
};

export default Recipes;
