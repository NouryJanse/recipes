import type { FunctionComponent } from "preact";
import { useEffect, useState, type StateUpdater } from "preact/hooks";
import Button from "../Form/Button";
import { addItemToShoppingList } from "../../services/store";

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

  // Should be styled and moved into a component in the Recipe subfolder
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

const retrieveMainImage = (recipe: any, setMainImage: StateUpdater<string>) => {
  if (recipe?.images?.length) {
    setMainImage(`url('${recipe.images[0].url}')`);
  } else {
    setMainImage(
      `url('https://res.cloudinary.com/dqnks1cyu/image/upload/v1664962512/recipes/healthy-eating-ingredients-732x549-thumbnail_y5ier5.jpg')`
    );
  }
};

const getStyle = (mainImage: string, isHovering: boolean) => {
  return {
    backgroundImage: mainImage,
    boxShadow: !isHovering ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.21)" : "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
  };
};

const handleOnAdd = (e: MouseEvent, recipe: any) => {
  e.stopPropagation();
  addItemToShoppingList(recipe);
};

export default RecipeCard;
