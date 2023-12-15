import type { StateUpdater } from "preact/hooks";
import { $shoppingListRecipes, setShoppingListRecipes } from "../../services/store";

export const retrieveMainImage = (recipe: Recipe, setMainImage: StateUpdater<string>) => {
  if (recipe?.images?.length) {
    setMainImage(`url('${recipe.images[0].url}')`);
  } else {
    setMainImage(
      `url('https://res.cloudinary.com/dqnks1cyu/image/upload/v1664962512/recipes/healthy-eating-ingredients-732x549-thumbnail_y5ier5.jpg')`
    );
  }
};

export const getStyle = (mainImage: string, isHovering: boolean) => {
  return {
    backgroundImage: mainImage,
    boxShadow: !isHovering ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.21)" : "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
  };
};

export const handleOnAdd = (e: MouseEvent, recipe: Recipe) => {
  e.stopPropagation();
  setShoppingListRecipes([recipe, ...$shoppingListRecipes.get()]);
};
