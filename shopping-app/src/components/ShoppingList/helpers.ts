import { setShoppingList } from "../../services/store";
import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";

export const checkForExistingShoppingList = (dbShoppingList: any) => {
  const data = localStorage.getItem("shoppingList");

  if (data) {
    const localShoppingList = JSON.parse(data);

    //@TODO: bugfix, local shoppinglist is always newer since the date is generated on every load (wrong)

    if (dbShoppingList?.updatedAt > localShoppingList?.updatedAt) {
      // db version is newer
      const sorted = sortShoppingListOnDate(dbShoppingList.list);
      setShoppingList(sorted);
    } else {
      // localStorage is newer
      const sorted = sortShoppingListOnDate(localShoppingList.list);
      setShoppingList(sorted);
    }
  } else if (dbShoppingList.list.length) {
    setShoppingList(dbShoppingList.list);
  } else {
    // new user with no data
  }
};
