import { setShoppingList, setShoppingListRecipes } from "../../services/store";
import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";

export const checkForExistingShoppingList = (dbShoppingList: any) => {
  const rawData = localStorage.getItem("data");

  if (rawData) {
    const data = JSON.parse(rawData);
    const { recipesList, shoppingList, updatedAt } = data;

    if (dbShoppingList?.updatedAt > updatedAt) {
      // db version is newer
      setShoppingList(sortShoppingListOnDate(dbShoppingList.shoppingList));
      setShoppingListRecipes(sortShoppingListOnDate(dbShoppingList.recipesList));
    } else {
      // localStorage is newer
      setShoppingList(shoppingList);
      setShoppingListRecipes(recipesList);
    }
  } else if (dbShoppingList) {
    const { recipesList, shoppingList } = dbShoppingList;
    setShoppingList(shoppingList ? shoppingList : []);
    setShoppingListRecipes(recipesList ? recipesList : []);
  } else {
    // new user with no data
  }
};
