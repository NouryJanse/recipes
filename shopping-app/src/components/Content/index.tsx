import type { FunctionComponent } from "preact";
import { Button, Recipes, ShoppingList } from "..";
import { useScreenDetector } from "./useScreenDetector";
import { useState } from "preact/hooks";

type ContentProps = {
  dbShoppingList: any;
  recipes: any;
};

const Content: FunctionComponent<ContentProps> = ({ dbShoppingList, recipes }) => {
  const { isMobile, isTablet, isDesktop } = useScreenDetector();
  const [showRecipes, setShowRecipes] = useState(false);

  const shouldRecipesBeShown = (): boolean => {
    return isTablet || isDesktop || showRecipes;
  };

  const shouldShoppingBeShown = (): boolean => {
    return !showRecipes || (showRecipes && (isTablet || isDesktop));
  };

  return (
    <>
      <div>
        <Button
          type="button"
          style="tertiary"
          onClick={() => {
            setShowRecipes(false);
          }}
          label="Groceries"
        />
        {isMobile && (
          <Button
            type="button"
            style="tertiary"
            onClick={() => {
              setShowRecipes(true);
            }}
            label="Recipes"
          />
        )}
        <Button type="button" style="tertiary" onClick={() => {}} label="Planning" />
      </div>

      {shouldShoppingBeShown() && <ShoppingList dbShoppingList={dbShoppingList} />}

      {shouldRecipesBeShown() && <Recipes serverRecipes={recipes} />}
    </>
  );
};

export default Content;
