import type { FunctionalComponent } from "preact";
import Modal from "../Modal";
import { useStore } from "@nanostores/preact";
import {
  $modalRecipeItem,
  $modalRecipeItemOpened,
  $shoppingListRecipes,
  setModalRecipeItemOpened,
  setShoppingListRecipes,
} from "../../services/store";
import { nanoid } from "nanoid";
import Button from "../Form/Button";
import RecipeItem from "../RecipeItem";
import type { TypeShoppingItem } from "../../services/types.db";
import { useEffect, useState } from "preact/hooks";
import updateArrayWithObjectById from "../../helpers/updateArrayWithObjectById";
import deleteObjectWithIdFromArray from "../../helpers/deleteObjectWithIdFromArray";
import { addIngredientsFromRecipeToList } from "../ShoppingItemRecipe/helpers";

type RecipeModalProps = {};

const RecipeModal: FunctionalComponent<RecipeModalProps> = ({}) => {
  const modalRecipeItemOpened: boolean = useStore($modalRecipeItemOpened);
  const modalRecipeItem: Recipe | undefined = useStore($modalRecipeItem);
  const [recipeItems, setRecipeItems] = useState<TypeShoppingItem[]>([]);

  if (!modalRecipeItem) return <></>;

  useEffect(() => {
    if (modalRecipeItem.ingredients && modalRecipeItem.ingredients.length) {
      const loc: TypeShoppingItem[] = modalRecipeItem.ingredients.map(({ amount, name, unit }: RecipeIngredient) => {
        return {
          id: nanoid(),
          amount: amount ? amount : 0,
          ingredientName: name ? name : "",
          checked: true,
          unit: unit ? unit : "",
          updatedAt: new Date().toISOString(),
        };
      });
      if (loc && loc.length) setRecipeItems(loc);
    }
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

const onSubmit = (recipeItems: TypeShoppingItem[]) => {
  const modalitems = $shoppingListRecipes.get();
  const id = $modalRecipeItem.get()?.id;

  if (modalitems && id) {
    setShoppingListRecipes(
      // @ts-ignore:next-line
      deleteObjectWithIdFromArray(
        modalitems.map((item) => {
          return { ...item, id: `${item.id}` };
        }),
        id.toString()
      )
    );
  }

  addIngredientsFromRecipeToList(recipeItems);

  $modalRecipeItem.set(undefined);
  $modalRecipeItemOpened.set(false);
};

const onUpdate = (recipeItem: TypeShoppingItem, recipeItems: TypeShoppingItem[], setRecipeItems: any) => {
  setRecipeItems(updateArrayWithObjectById(recipeItems, recipeItem));
};

export default RecipeModal;
