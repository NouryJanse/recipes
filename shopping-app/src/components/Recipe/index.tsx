import type { FunctionComponent } from "preact";

type RecipeProps = {
  recipe: any;
};

const Recipe: FunctionComponent<RecipeProps> = ({ recipe }) => {
  return (
    <div>
      <p>{recipe.name}</p>
      <p>{recipe.description}</p>
      <a href="/">Back</a>
    </div>
  );
};

export default Recipe;
