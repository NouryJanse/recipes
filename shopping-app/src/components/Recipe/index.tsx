import type { FunctionComponent } from "preact";

type RecipeProps = {
  recipe: any;
};

const Recipe: FunctionComponent<RecipeProps> = ({ recipe }) => {
  return (
    <>
      <p>{recipe.name}</p>
      <p>{recipe.description}</p>
      <a href="/">Back</a>
    </>
  );
};

export default Recipe;
