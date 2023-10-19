import { Ingredient } from "@nouryjanse/recipe-types";

const getFormattedShoppingList = (id: string, list: Ingredient[]) => {
  return JSON.stringify({ _id: id, updatedAt: `${new Date().toISOString()}`, list });
};

export default getFormattedShoppingList;
