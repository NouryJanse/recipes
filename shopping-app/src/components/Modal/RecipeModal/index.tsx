import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";

import { mapRecipeIngredientsToShoppingItems, onSubmit, onUpdate } from "./helpers";
import options from "./options";
import {
  $modalRecipeItem,
  $modalRecipeItemOpened,
  getShoppingListRecipes,
  setContentSwitcher,
  setModalRecipeItemOpened,
  setShoppingListRecipes,
} from "../../../services/store";
import type { TypeShoppingItem } from "../../../services/types.db";
import Modal from "..";
import { Button, RecipeItem, Select } from "../..";
import { getRecipePlanning } from "../../../helpers/getRecipePlanning";
import { syncToSocket } from "../../../helpers/syncToSocket";

const RecipeModal: FunctionalComponent = ({}) => {
  const modalRecipeItemOpened: boolean = useStore($modalRecipeItemOpened);
  const modalRecipeItem: Recipe | undefined = useStore($modalRecipeItem);
  const [recipeItems, setRecipeItems] = useState<TypeShoppingItem[]>([]);

  const [selectedNumberOfPersons, setSelectedNumberOfPersons] = useState(0);
  const [cookingDate, setCookingDate] = useState("");

  if (!modalRecipeItem) return <></>;

  useEffect(() => {
    // set initial and changed values for number of persons
    setSelectedNumberOfPersons(modalRecipeItem.numberOfPersons);
  }, [modalRecipeItem]);

  useEffect(() => {
    // set ingredients when modal recipe item is available, also recalculate when number of persons is changed
    mapRecipeIngredientsToShoppingItems(modalRecipeItem, setRecipeItems, selectedNumberOfPersons);
  }, [modalRecipeItem, selectedNumberOfPersons]);

  return (
    <Modal
      isOpen={modalRecipeItemOpened}
      hasCloseBtn={true}
      title={`Plan ${modalRecipeItem.name}`}
      onClose={() => {
        setCookingDate("");
        setModalRecipeItemOpened(false);
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
            setModalRecipeItemOpened(false);
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
  setModalRecipeItemOpened: any
): void => {
  setStep(1);
  setSelectedNumberOfPersons(2);
  setCookingDate("");
  setModalRecipeItemOpened(false);
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

export default RecipeModal;
