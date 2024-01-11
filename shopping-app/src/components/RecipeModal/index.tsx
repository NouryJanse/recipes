import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";

import { $modalRecipeItem, $modalRecipeItemOpened, setModalRecipeItemOpened } from "../../services/store";
import type { TypeShoppingItem } from "../../services/types.db";
import { mapRecipeIngredientsToShoppingItems, onSubmit, onUpdate } from "./helpers";

import Modal from "../Modal";
import Button from "../Form/Button";
import RecipeItem from "../RecipeItem";
import Select from "../Form/Select";

const RecipeModal: FunctionalComponent = ({}) => {
  const modalRecipeItemOpened: boolean = useStore($modalRecipeItemOpened);
  const modalRecipeItem: Recipe | undefined = useStore($modalRecipeItem);
  const [recipeItems, setRecipeItems] = useState<TypeShoppingItem[]>([]);
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
      isOpen={modalRecipeItemOpened}
      hasCloseBtn={true}
      title={modalRecipeItem.name ? modalRecipeItem.name : ""}
      onClose={() => setModalRecipeItemOpened(false)}
    >
      <Select
        label="Number of persons"
        onInput={(event: Event) => {
          const target = event.target as HTMLInputElement | HTMLSelectElement;
          setSelectedNumberOfPersons(Number.parseInt(target.value));
        }}
        selected={modalRecipeItem.numberOfPersons.toString()}
        options={[
          { id: 0, text: "Make a choice", value: "0", disabled: false },
          { id: 1, text: "1 person", value: "1", disabled: false },
          { id: 2, text: "2 persons", value: "2", disabled: false },
          { id: 3, text: "3 persons", value: "3", disabled: false },
          { id: 4, text: "4 persons", value: "4", disabled: false },
          { id: 5, text: "5 persons", value: "5", disabled: false },
          { id: 6, text: "6 persons", value: "6", disabled: false },
          { id: 7, text: "7 persons", value: "7", disabled: false },
          { id: 8, text: "8 persons", value: "8", disabled: false },
          { id: 9, text: "9 persons", value: "9", disabled: false },
          { id: 10, text: "10 persons", value: "10", disabled: false },
        ]}
      />

      {recipeItems.map((recipeItem: TypeShoppingItem) => (
        <RecipeItem
          recipeItem={recipeItem}
          onUpdate={(updatedItem) => onUpdate(updatedItem, recipeItems, setRecipeItems)}
          selectedNumberOfPersons={selectedNumberOfPersons}
        />
      ))}

      <Button type="button" children="Add to shopping list" style="primary" onClick={() => onSubmit(recipeItems)} />
    </Modal>
  );
};

export default RecipeModal;
