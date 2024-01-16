import type { FunctionComponent } from "preact";
import { Button, Planning, Recipes, ShoppingList } from "..";
import { useScreenDetector } from "./useScreenDetector";
import { useEffect, useState } from "preact/hooks";

type ContentProps = {
  dbShoppingList: any;
  recipes: any;
};

const Content: FunctionComponent<ContentProps> = ({ dbShoppingList, recipes }) => {
  const { isMobile, isTablet, isDesktop } = useScreenDetector();
  const [showRecipes, setShowRecipes] = useState<"groceries" | "recipes" | "planning">("groceries");

  const shouldIBeShown = (template: string): boolean => {
    if (isMobile && template === showRecipes) return true;
    if ((!isMobile && template === showRecipes) || (!isMobile && template === "groceries")) return true;
    return false;
  };

  useEffect(() => {
    if (isTablet || isDesktop) {
      setShowRecipes("recipes");
    } else {
      setShowRecipes("groceries");
    }
  }, []);

  return (
    <>
      <div className="shopping--buttons">
        {isMobile && (
          <Button type="button" style="tertiary" onClick={() => setShowRecipes("groceries")} label="Groceries" />
        )}
        <>
          <Button type="button" style="tertiary" onClick={() => setShowRecipes("recipes")} label="Recipes" />
          <Button type="button" style="tertiary" onClick={() => setShowRecipes("planning")} label="Planning" />
        </>
      </div>

      <div className="shopping--container">
        {shouldIBeShown("groceries") && <ShoppingList dbShoppingList={dbShoppingList} />}
        {shouldIBeShown("recipes") && <Recipes serverRecipes={recipes} />}
        {shouldIBeShown("planning") && <Planning />}
      </div>
    </>
  );
};

export default Content;
