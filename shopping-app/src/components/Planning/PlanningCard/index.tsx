import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { getShoppingListRecipes, setShoppingListRecipes } from "../../../services/store";
import { syncToSocket } from "../../../helpers/syncToSocket";
import { Button } from "../..";
import { getStyle, handleOnAdd, retrieveMainImage } from "./helpers";

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
      className="planning--card"
      style={getStyle(mainImage, isHovering)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => (window.location.href = `recipes/${recipe.id}`)}
    >
      <div className="first-row">
        <div>
          <span>{recipe.cookingDate}</span>
          <h3>{recipe.name}</h3>
        </div>
        <div>
          <Button
            type="button"
            style="transparent"
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
        </div>
      </div>

      <Button
        type="button"
        style="transparent"
        onClick={(e) => {
          e.stopPropagation();
          handleOnAdd(recipe);
        }}
      >
        Add to groceries
      </Button>
    </div>
  );
};

export default PlanningCard;
