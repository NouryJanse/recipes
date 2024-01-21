import type { FunctionComponent } from "preact";
import { useEffect, useState, type StateUpdater } from "preact/hooks";
import deleteObjectWithIdFromArray from "../../../helpers/deleteObjectWithIdFromArray";
import {
  getShoppingListRecipes,
  setModalRecipeItem,
  setRecipeIngredientsModalOpened,
  setShoppingListRecipes,
} from "../../../services/store";
import { syncToSocket } from "../../../helpers/syncToSocket";
import { Button } from "../..";
// import { getStyle, handleOnAdd, retrieveMainImage } from "./helpers";

type PlanningCardProps = {
  recipe: any;
  withEditButton?: boolean;
  withRemovalButton?: boolean;
};

const PlanningCard: FunctionComponent<PlanningCardProps> = ({ recipe }) => {
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
          <span>{recipe.cookingDate}</span>
        </div>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShoppingListRecipes(
              getShoppingListRecipes().filter((a: any) => {
                return a.cookingDate === recipe.cookingDate ? null : a;
              })
            );
            syncToSocket();
          }}
        >
          x
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setModalRecipeItem(recipe);
            setRecipeIngredientsModalOpened(true);
            // setShoppingListRecipes(
            //   getShoppingListRecipes().filter((a: any) => {
            //     return a.cookingDate === recipe.cookingDate ? null : a;
            //   })
            // );
            // syncToSocket();
          }}
        >
          Add to groceries
        </Button>
      </div>
    </div>
  );
};

const retrieveMainImage = (recipe: Recipe, setMainImage: StateUpdater<string>) => {
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

export default PlanningCard;
