// import { AiTwotoneEdit } from "react-icons/ai";
// import { MdDelete } from "react-icons/md";
// import classNames from "classnames";

import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

// import RecipeContainer from "./styled";
// import { deleteRecipe, getRecipes } from "../../../../redux/reducers/recipes/recipeSlice";
// import { Button } from "../../../index";
// import { getDifferenceInFormat } from "../../../../helpers/DateHelper";
// import RootState from "../../../../types/RootState";
// import courseName from "../../../../pages/Recipe/Edit/helpers";
// import { RECIPE_COURSE_OPTIONS, REPLACEMENT_IMAGE } from "../../../../constants";

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

  // const showNewLabel = (): boolean => {
  //   if (recipe.createdAt && getDifferenceInFormat(recipe.createdAt, "d") < 7) return true;
  //   return false;
  // };

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
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 overflow-hidden">
      <a href={`recipes/${recipe.id}`} className="recipe--card">
        <div
          style={{
            backgroundImage: mainImage,
            boxShadow: !isHovering ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)" : "inset 0 0 0 2000px rgba(0, 0, 0, 0.4)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* <div
        className={classNames(
          {
            visible: showNewLabel(),
            invisible: !showNewLabel(),
          },
          "inline-flex font-bold text-white border-2 rounded-lg p-1"
        )}
      >
        New!
      </div> */}

          <div className="">
            <div className="">
              <h2 className="">{recipe.name}</h2>

              <p className="">
                {recipe.course}
                {/* <i>{courseName(recipe.course ? recipe.course : "", RECIPE_COURSE_OPTIONS)}</i> */}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default RecipeCard;
