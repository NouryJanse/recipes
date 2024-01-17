import type { FunctionComponent } from "preact";
import { Button, Groceries, Planning, Recipes } from "..";
import { useScreenDetector } from "./useScreenDetector";
import { useEffect, useState } from "preact/hooks";
import type { Style } from "../Form/Button";

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
          <Button
            type="button"
            style={buttonStyle(showRecipes, "groceries")}
            onClick={() => setShowRecipes("groceries")}
            label="Groceries"
          />
        )}
        <>
          <Button
            type="button"
            style={buttonStyle(showRecipes, "recipes")}
            onClick={() => setShowRecipes("recipes")}
            label="My recipes"
          />
          <Button
            type="button"
            style={buttonStyle(showRecipes, "planning")}
            onClick={() => setShowRecipes("planning")}
            label="My planning"
          />
        </>
      </div>

      <div className="shopping--container">
        {shouldIBeShown("groceries") && <Groceries dbShoppingList={dbShoppingList} />}
        {shouldIBeShown("recipes") && <Recipes serverRecipes={recipes} />}
        {shouldIBeShown("planning") && <Planning />}
      </div>
    </>
  );
};

const buttonStyle = (showRecipes: string, buttonName: string): "primary" | "secondary" | "tertiary" | "transparent" => {
  return showRecipes === buttonName ? "primary" : "tertiary";
};
export default Content;
