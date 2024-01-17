import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";

import { mapRecipeIngredientsToShoppingItems, onSubmit, onUpdate } from "./helpers";
import options from "./options";
import { $modalRecipeItem, $modalRecipeItemOpened, setModalRecipeItemOpened } from "../../../services/store";
import type { TypeShoppingItem } from "../../../services/types.db";
import Modal from "..";
import { Button, RecipeItem, Select } from "../..";
import { getRecipePlanning } from "../../../helpers/getRecipePlanning";

const RecipeModal: FunctionalComponent = ({}) => {
  const modalRecipeItemOpened: boolean = useStore($modalRecipeItemOpened);
  const modalRecipeItem: Recipe | undefined = useStore($modalRecipeItem);
  const [recipeItems, setRecipeItems] = useState<TypeShoppingItem[]>([]);
  const [step, setStep] = useState<0 | 1 | 2>(1);

  const [selectedNumberOfPersons, setSelectedNumberOfPersons] = useState(0);
  const [recipeDate, setRecipeDate] = useState("");

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
      title={recipeTitle(step, modalRecipeItem.name)}
      onClose={() => setModalRecipeItemOpened(false)}
    >
      <div className="modal--recipe">
        <div>
          {step === 1 && (
            <Select
              label="Cooking day"
              onInput={(event: Event) => {
                const target = event.target as HTMLInputElement | HTMLSelectElement;
                setRecipeDate(target.value);
              }}
              selected={recipeDate}
              options={[
                { id: -2, text: "Pick a day", value: "none", disabled: false },
                { id: -1, text: "16-1-2024", value: "16-01-2024", disabled: true },
                ...getRecipePlanning().map((obj, key) => {
                  return { id: key, text: obj.date, value: obj.date, disabled: false };
                }),
              ]}
            />
          )}

          {step === 2 && (
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
          )}
        </div>

        <div className="buttons">
          {step === 1 && (
            <>
              <Button
                type="button"
                children="I don't want to plan this recipe"
                style="secondary"
                onClick={() => setStep(2)}
              />
              <>
                <Button type="button" children="Save and continue" style="primary" onClick={() => setStep(2)} />
              </>
            </>
          )}
          {step === 2 && (
            <>
              <>
                <Button type="button" children="Back to planning" style="secondary" onClick={() => setStep(1)} />
              </>

              <Button
                type="button"
                children={`Lets cook ${modalRecipeItem.name}!`}
                style="primary"
                onClick={() => onSubmit(recipeItems)}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

const recipeTitle = (step: number, recipeName: string): string => {
  if (step === 1) return "Do you want to plan this meal?";
  if (step === 2) return "Select the ingredients you want to add to the list";
  return recipeName;
};

export default RecipeModal;
