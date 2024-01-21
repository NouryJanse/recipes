import type { FunctionComponent } from "preact";
import { getRecipePlanning } from "../../helpers/getRecipePlanning";
import { $shoppingListRecipes, setContentSwitcher } from "../../services/store";
import PlanningCard from "./PlanningCard";
import { useStore } from "@nanostores/preact";
import { Button, RecipeIngredientsModal } from "..";

const Planning: FunctionComponent = ({}) => {
  const planningItems = useStore($shoppingListRecipes);

  return (
    <div className="planning">
      <RecipeIngredientsModal />
      <h2>Your planning</h2>
      <div className="grid">
        {getRecipePlanning().map((object) => {
          if (!planningItems) return;
          const recipe = planningItems.find((r: any) => r.cookingDate === object.date);

          if (!recipe) {
            return (
              <>
                <div className="planning--item">
                  No recipe planned on {object.date}
                  <Button type="button" onClick={() => setContentSwitcher("recipes")}>
                    +
                  </Button>
                </div>
              </>
            );
          }
          return <PlanningCard recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default Planning;
