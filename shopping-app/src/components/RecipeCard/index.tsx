import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import Button from "../Form/Button";

type RecipeCardProps = {
  recipe: any;
  withEditButton?: boolean;
  withRemovalButton?: boolean;
};

const RecipeCard: FunctionComponent<RecipeCardProps> = ({ recipe }) => {
  const [mainImage, setMainImage] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (): void => {
    setIsHovering(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (recipe?.images?.length) {
      setMainImage(`url('${recipe.images[0].url}')`);
    } else {
      setMainImage(
        `url('https://res.cloudinary.com/dqnks1cyu/image/upload/v1664962512/recipes/healthy-eating-ingredients-732x549-thumbnail_y5ier5.jpg')`
      );
    }
  }, [recipe]);

  // Should be styled and moved into a component in the Recipe subfolder
  if (!recipe) return <p>Error, no recipe found.</p>;

  return (
    <div
      className="recipe--card"
      style={{
        backgroundImage: mainImage,
        boxShadow: !isHovering ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.21)" : "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => (window.location.href = `recipes/${recipe.id}`)}
    >
      <div>
        <div>
          <h3>{recipe.name}</h3>

          <span>{recipe.course} </span>
        </div>

        <Button
          type="button"
          style="primary"
          classes="add-button"
          onClick={(e) => {
            e.stopPropagation();
            console.log(recipe.id, recipe.name);
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default RecipeCard;
