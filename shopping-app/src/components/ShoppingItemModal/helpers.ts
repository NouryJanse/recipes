import { nanoid } from "nanoid";
import type { TypeShoppingItem } from "../../services/types.db";

import {
  type FormStateType,
  $formState,
  $shoppingList,
  setFormState,
  setModalShoppingItem,
  setShoppingList,
  resetFormState,
  getShoppingList,
} from "../../services/store";

import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";
import replaceShoppingItemInList from "../../helpers/replaceShoppingItemInList";
import { syncToSocket } from "../../helpers/syncToSocket";

export const createShoppingItem = (
  formState: FormStateType,
  editedShoppingItem?: TypeShoppingItem
): TypeShoppingItem => {
  // update existing shopping item
  if (editedShoppingItem) {
    return {
      ...editedShoppingItem,
      ingredientName: formState.ingredientName,
      amount: formState.amount ? Number.parseInt(formState.amount) : 0,
      unit: formState.unit ? formState.unit : "pc",
      updatedAt: new Date().toISOString(),
    };
  }

  // create new shopping item
  return {
    id: nanoid(),
    ingredientName: formState.ingredientName,
    amount: formState.amount ? Number.parseInt(formState.amount) : 0,
    unit: formState.unit ? formState.unit : "pc",
    updatedAt: new Date().toISOString(),
    checked: false,
  };
};

export const addShoppingItem = (formState: FormStateType) => {
  const newShoppingItem = createShoppingItem(formState, undefined);
  const shoppingList = getShoppingList();

  let updatedList;
  if (shoppingList.length) {
    updatedList = sortShoppingListOnDate([...shoppingList, newShoppingItem]);
  } else {
    updatedList = [newShoppingItem];
  }

  setShoppingList(updatedList);
  syncToSocket();
  setModalShoppingItem(undefined);
};

export const editShoppingItem = (formState: FormStateType, editedShoppingItem: TypeShoppingItem) => {
  const newShoppingItem = createShoppingItem(formState, editedShoppingItem);
  const items = replaceShoppingItemInList($shoppingList.get(), editedShoppingItem, newShoppingItem);
  const updatedList = sortShoppingListOnDate(items);

  setShoppingList(updatedList);
  syncToSocket();
  setModalShoppingItem(undefined);
  0;
};

export const handleInputChange = (event: Event): void => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const { name, value } = target;

  setFormState({
    ...$formState.get(),
    [name]: value,
  });
};

export const handleOnSubmit = (editedShoppingItem: FormStateType | TypeShoppingItem | undefined) => {
  if (!editedShoppingItem) {
    // new shopping item
    addShoppingItem($formState.get());
    resetFormState();
    return;
  }

  if ("id" in editedShoppingItem) {
    // edit a shopping item
    editShoppingItem($formState.get(), editedShoppingItem);
    resetFormState();
    return;
  }

  return;
};

export const modalTitle = (
  editedShoppingItem: FormStateType | TypeShoppingItem | undefined,
  formState: FormStateType
): string => {
  // creating a new shopping item
  if (!editedShoppingItem) return `Add new shopping item`;

  // editing existing
  if ("id" in editedShoppingItem) return `Editing ${formState.ingredientName}`;

  // adding seasonal
  if (editedShoppingItem.ingredientName) return `Adding ${formState.ingredientName}`;
  return "";
};
