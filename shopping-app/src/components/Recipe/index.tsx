import type { FunctionComponent } from "preact";

type RecipeProps = {
  recipe: any;
};

const Recipe: FunctionComponent<RecipeProps> = ({ recipe }) => {
  return (
    <>
      <h1>{recipe.name}</h1>
      <a href="/">Back</a>
      <p>
        <i>{recipe.course}</i>
      </p>

      <img src={recipe.images[0].url} alt={recipe.name} />

      <p>{recipe.description}</p>
    </>
  );
};

export default Recipe;
