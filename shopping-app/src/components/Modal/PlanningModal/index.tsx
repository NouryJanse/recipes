import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";

import {
  $modalRecipeItem,
  $planningModalOpened,
  $shoppingListRecipes,
  setContentSwitcher,
  setPlanningModalOpened,
} from "../../../services/store";
import Modal from "..";
import { Button, Select } from "../..";
import { getRecipePlanning } from "../../../helpers/getRecipePlanning";
import { saveRecipeToPlanning } from "./helpers";

const PlanningModal: FunctionalComponent = ({}) => {
  const planningModalOpened: boolean = useStore($planningModalOpened);
  const modalRecipeItem: Recipe | undefined = useStore($modalRecipeItem);
  const [cookingDate, setCookingDate] = useState("");

  if (!modalRecipeItem) return <></>;

  return (
    <Modal
      isOpen={planningModalOpened}
      hasCloseBtn={true}
      title={`Plan ${modalRecipeItem.name}`}
      onClose={() => {
        setCookingDate("");
        setPlanningModalOpened(false);
      }}
    >
      <div className="modal--recipe">
        <div>
          <Select
            label="Cooking day"
            onInput={(event: Event) => {
              const target = event.target as HTMLInputElement | HTMLSelectElement;
              setCookingDate(target.value);
            }}
            selected={cookingDate}
            options={[
              { id: -1, text: "Pick a day", value: "none", disabled: false },
              ...getRecipePlanning()
                .map((obj, key) => {
                  return { id: key, text: obj.date, value: obj.date, disabled: false };
                })
                .filter(
                  (planningObj: any) =>
                    !$shoppingListRecipes.get().find((recipe: any) => recipe.cookingDate === planningObj.value)
                ),
            ]}
          />
        </div>

        <Button
          type="button"
          children="Save"
          style="primary"
          onClick={() => {
            if (cookingDate) saveRecipeToPlanning(cookingDate, modalRecipeItem);
            setPlanningModalOpened(false);
            setContentSwitcher("planning");
          }}
        />
      </div>
    </Modal>
  );
};

export default PlanningModal;
