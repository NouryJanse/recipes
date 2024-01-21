import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";

import { mapRecipeIngredientsToShoppingItems, onSubmit, onUpdate, recipeTitle, resetForm } from "./helpers";
import options from "./options";
import { $ingredientsModalOpened, $modalRecipeItem, setIngredientsModalOpened } from "../../../services/store";
import type { TypeShoppingItem } from "../../../services/types.db";
import Modal from "..";
import { Button, RecipeItem, Select } from "../..";

const IngredientsModal: FunctionalComponent = ({}) => {
  const ingredientsModalOpened: boolean = useStore($ingredientsModalOpened);
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
      isOpen={ingredientsModalOpened}
      hasCloseBtn={true}
      title={recipeTitle(step, modalRecipeItem.name)}
      onClose={() => resetForm(setStep, setSelectedNumberOfPersons, setIngredientsModalOpened)}
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

export default IngredientsModal;
