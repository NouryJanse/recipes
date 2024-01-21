import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";

import {
  $modalRecipeItem,
  $planningModalOpened,
  getShoppingListRecipes,
  setContentSwitcher,
  setPlanningModalOpened,
  setShoppingListRecipes,
} from "../../../services/store";
import Modal from "..";
import { Button, Select } from "../..";
import { syncToSocket } from "../../../helpers/syncToSocket";
import { getRecipePlanning } from "../../../helpers/getRecipePlanning";

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
              ...getRecipePlanning().map((obj, key) => {
                return { id: key, text: obj.date, value: obj.date, disabled: false };
              }),
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

const resetForm = (
  setStep: any,
  setSelectedNumberOfPersons: any,
  setCookingDate: any,
  setGroceryItemModalOpened: any
): void => {
  setStep(1);
  setSelectedNumberOfPersons(2);
  setCookingDate("");
  setGroceryItemModalOpened(false);
};

const saveRecipeToPlanning = (cookingDate: string, recipe: any) => {
  const newPlanningRecipe = { cookingDate, ...recipe };
  const shoppingListRecipes = getShoppingListRecipes();
  const contains = shoppingListRecipes.find((listRecipe: any) => listRecipe.cookingDate === cookingDate);

  if (!contains) {
    if (shoppingListRecipes.length) setShoppingListRecipes([newPlanningRecipe, ...shoppingListRecipes]);
    if (!shoppingListRecipes.length) setShoppingListRecipes([newPlanningRecipe]);
    syncToSocket();
  }
};

export default PlanningModal;
