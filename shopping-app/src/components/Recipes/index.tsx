import type { FunctionComponent } from "preact";

type RecipesProps = {
  recipes: any[];
};

const Recipes: FunctionComponent<RecipesProps> = ({ recipes }) => {
  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length &&
        recipes.map((recipe: any) => {
          return <a href={`recipes/${recipe.id}`}>{recipe.name}</a>;
        })}
    </div>
  );
};

export default Recipes;
