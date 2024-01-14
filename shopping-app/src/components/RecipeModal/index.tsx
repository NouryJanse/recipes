import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";

import { $modalRecipeItem, $modalRecipeItemOpened, setModalRecipeItemOpened } from "../../services/store";
import type { TypeShoppingItem } from "../../services/types.db";
import { mapRecipeIngredientsToShoppingItems, onSubmit, onUpdate } from "./helpers";
import options from "./options";

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
        options={options}
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
