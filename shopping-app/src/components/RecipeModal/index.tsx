import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";

import { $modalRecipeItem, $modalRecipeItemOpened, setModalRecipeItemOpened } from "../../services/store";
import type { TypeShoppingItem } from "../../services/types.db";
import { mapRecipeIngredientsToShoppingItems, onSubmit, onUpdate } from "./helpers";

import Modal from "../Modal";
import Button from "../Form/Button";
import RecipeItem from "../RecipeItem";

const RecipeModal: FunctionalComponent = ({}) => {
  const modalRecipeItemOpened: boolean = useStore($modalRecipeItemOpened);
  const modalRecipeItem: Recipe | undefined = useStore($modalRecipeItem);
  const [recipeItems, setRecipeItems] = useState<TypeShoppingItem[]>([]);

  if (!modalRecipeItem) return <></>;

  useEffect(() => {
    mapRecipeIngredientsToShoppingItems(modalRecipeItem, setRecipeItems);
  }, [modalRecipeItem]);

  return (
    <Modal
      isOpen={modalRecipeItemOpened}
      hasCloseBtn={true}
      title={modalRecipeItem.name ? modalRecipeItem.name : ""}
      onClose={() => setModalRecipeItemOpened(false)}
    >
      {recipeItems.map((recipeItem: TypeShoppingItem) => (
        <RecipeItem
          recipeItem={recipeItem}
          onUpdate={(updatedItem) => onUpdate(updatedItem, recipeItems, setRecipeItems)}
        />
      ))}

      <Button type="button" children="Add to shopping list" style="primary" onClick={() => onSubmit(recipeItems)} />
    </Modal>
  );
};

export default RecipeModal;
