import type { FunctionComponent } from "preact";

type RecipeProps = {
  recipe: Recipe;
};

const Recipe: FunctionComponent<RecipeProps> = ({ recipe }) => {
  return (
    <div class="container">
      <h1>{recipe.name}</h1>

      <a href="/">Back</a>

      <p>
        <i>{recipe.course}</i>
      </p>

      {recipe?.images?.length && <img src={recipe.images[0].url} alt={recipe.name} />}

      <p>{recipe.description}</p>
    </div>
  );
};

export default Recipe;
