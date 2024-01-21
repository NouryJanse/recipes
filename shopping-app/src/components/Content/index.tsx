import type { FunctionComponent } from "preact";
import { Button, Groceries, Planning, Recipes } from "..";
import { useScreenDetector } from "./useScreenDetector";
import { useEffect } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { $contentSwitcher, setContentSwitcher } from "../../services/store";

type ContentProps = {
  dbShoppingList: any;
  recipes: any;
};

const Content: FunctionComponent<ContentProps> = ({ dbShoppingList, recipes }) => {
  const { isMobile, isTablet, isDesktop } = useScreenDetector();
  const contentSwitcher = useStore($contentSwitcher);

  const shouldIBeShown = (template: string): boolean => {
    if (isMobile && template === contentSwitcher) return true;
    if ((!isMobile && template === contentSwitcher) || (!isMobile && template === "groceries")) return true;
    return false;
  };

  //
  // TODO: move socket here because its currently creating new connections because of the content switcher
  //

  useEffect(() => {
    if (isTablet || isDesktop) {
      setContentSwitcher("recipes");
    } else {
      setContentSwitcher("groceries");
    }
  }, []);

  return (
    <>
      <div className="shopping--buttons">
        {isMobile && (
          <Button
            type="button"
            style={buttonStyle(contentSwitcher, "groceries")}
            onClick={() => setContentSwitcher("groceries")}
            label="Groceries"
          />
        )}
        <>
          <Button
            type="button"
            style={buttonStyle(contentSwitcher, "recipes")}
            onClick={() => setContentSwitcher("recipes")}
            label="My recipes"
          />
          <Button
            type="button"
            style={buttonStyle(contentSwitcher, "planning")}
            onClick={() => setContentSwitcher("planning")}
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

const buttonStyle = (
  contentSwitcher: string,
  buttonName: string
): "primary" | "secondary" | "tertiary" | "transparent" => {
  return contentSwitcher === buttonName ? "primary" : "tertiary";
};
export default Content;
