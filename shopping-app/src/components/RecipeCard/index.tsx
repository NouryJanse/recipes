import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import Button from "../Form/Button";
import { getStyle, handleOnAdd, retrieveMainImage } from "./helpers";

type RecipeCardProps = {
  recipe: any;
  withEditButton?: boolean;
  withRemovalButton?: boolean;
};

const RecipeCard: FunctionComponent<RecipeCardProps> = ({ recipe }) => {
  const [mainImage, setMainImage] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    retrieveMainImage(recipe, setMainImage);
  }, [recipe]);

  if (!recipe) return <p>Error, no recipe found.</p>;

  return (
    <div
      className="recipe--card"
      style={getStyle(mainImage, isHovering)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => (window.location.href = `recipes/${recipe.id}`)}
    >
      <div>
        <div>
          <h3>{recipe.name}</h3>
          <span className="course">{recipe.course} </span>
        </div>

        <Button
          type="button"
          style="transparent"
          classes="add-button"
          onClick={(e) => handleOnAdd(e, recipe)}
          label="Add"
        />
      </div>
    </div>
  );
};

export default RecipeCard;
