import type { FunctionComponent } from "preact";
import { getRecipePlanning } from "../../helpers/getRecipePlanning";
import { $shoppingListRecipes, setContentSwitcher } from "../../services/store";
import PlanningCard from "./PlanningCard";
import { useStore } from "@nanostores/preact";
import { Button, IngredientsModal } from "..";
import { useEffect } from "preact/hooks";

const Planning: FunctionComponent = ({}) => {
  const planningItems = useStore($shoppingListRecipes);

  useEffect(() => {
    getRecipePlanning();
  }, [planningItems]);

  return (
    <div className="planning">
      <IngredientsModal />

      <div>
        <h2>Your planning</h2>

        <div className="grid">
          {getRecipePlanning().map((object) => {
            if (!planningItems) return;

            const recipe = planningItems.find((r: any) => r.cookingDate === object.date);
            if (!recipe) {
              return (
                <>
                  <div className="planning--card empty" onClick={() => setContentSwitcher("recipes")}>
                    <div className="first-row">
                      <div>
                        <span>{object.date}</span>
                      </div>
                    </div>
                    <Button type="button" style="secondary">
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
    </div>
  );
};

export default Planning;
