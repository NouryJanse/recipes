import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";

import { mapRecipeIngredientsToShoppingItems, onSubmit, onUpdate } from "./helpers";
import options from "./options";
import {
  $modalRecipeItem,
  $recipeIngredientsModalOpened,
  getShoppingListRecipes,
  setRecipeIngredientsModalOpened,
  setShoppingListRecipes,
} from "../../../services/store";
import type { TypeShoppingItem } from "../../../services/types.db";
import Modal from "..";
import { Button, RecipeItem, Select } from "../..";
import { syncToSocket } from "../../../helpers/syncToSocket";

const RecipeIngredientsModal: FunctionalComponent = ({}) => {
  const recipeIngredientsModalOpened: boolean = useStore($recipeIngredientsModalOpened);
  const modalRecipeItem: Recipe | undefined = useStore($modalRecipeItem);
  const [recipeItems, setRecipeItems] = useState<TypeShoppingItem[]>([]);
  const [step, setStep] = useState<0 | 1 | 2>(1);

  const [selectedNumberOfPersons, setSelectedNumberOfPersons] = useState(0);

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
      isOpen={recipeIngredientsModalOpened}
      hasCloseBtn={true}
      title={recipeTitle(step, modalRecipeItem.name)}
      onClose={() => resetForm(setStep, setSelectedNumberOfPersons, setRecipeIngredientsModalOpened)}
    >
      <div className="modal--recipe">
        <div>
          <>
            <Select
              label="Number of persons"
              onInput={(event: Event) => {
                const target = event.target as HTMLInputElement | HTMLSelectElement;
                setSelectedNumberOfPersons(Number.parseInt(target.value));
              }}
              selected={modalRecipeItem.numberOfPersons.toString()}
              options={options}
            />

            <div>
              {recipeItems.map((recipeItem: TypeShoppingItem) => (
                <RecipeItem
                  recipeItem={recipeItem}
                  onUpdate={(updatedItem) => onUpdate(updatedItem, recipeItems, setRecipeItems)}
                  selectedNumberOfPersons={selectedNumberOfPersons}
                />
              ))}
            </div>
          </>
        </div>

        <div className="buttons">
          <Button
            type="button"
            children={`Add ${modalRecipeItem.name} to groceries`}
            style="primary"
            onClick={() => onSubmit(recipeItems)}
          />
        </div>
      </div>
    </Modal>
  );
};

const resetForm = (setStep: any, setSelectedNumberOfPersons: any, setRecipeIngredientsModalOpened: any): void => {
  setStep(1);
  setSelectedNumberOfPersons(2);
  setRecipeIngredientsModalOpened(false);
};

const recipeTitle = (step: number, recipeName: string): string => {
  if (step === 1) return "Do you want to plan this meal?";
  if (step === 2) return "Select the ingredients you want to add to the list";
  return recipeName;
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

export default RecipeIngredientsModal;
