import { nanoid } from "nanoid";
import type { TypeShoppingItem } from "../../services/types.db";
import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";
import {
  $formState,
  $list,
  setFormState,
  setModalShoppingItem,
  setShoppingList,
  type FormStateType,
} from "../../services/store";
import replaceShoppingItemInList from "../../helpers/replaceShoppingItemInList";
import { syncToSocket, updateLocalStorage } from "../ShoppingList/helpers";

export const createShoppingItem = (
  formState: FormStateType,
  editedShoppingItem?: TypeShoppingItem
): TypeShoppingItem => {
  // update existing shopping item
  if (editedShoppingItem) {
    return {
      ...editedShoppingItem,
      ingredientName: formState.ingredientName,
      amount: Number.parseInt(formState.amount),
      unit: formState.unit,
      updatedAt: new Date().toISOString(),
    };
  }

  // create new shopping item
  return {
    id: nanoid(),
    ingredientName: formState.ingredientName,
    amount: Number.parseInt(formState.amount),
    unit: formState.unit,
    updatedAt: new Date().toISOString(),
    checked: false,
  };
};

export const addShoppingItem = (formState: FormStateType) => {
  const newShoppingItem = createShoppingItem(formState, undefined);
  const updatedList = sortShoppingListOnDate([...$list.get(), newShoppingItem]);

  setShoppingList(updatedList);
  setModalShoppingItem(undefined);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

export const editShoppingItem = (formState: FormStateType, editedShoppingItem: TypeShoppingItem) => {
  const newShoppingItem = createShoppingItem(formState, editedShoppingItem);
  const items = replaceShoppingItemInList($list.get(), editedShoppingItem, newShoppingItem);
  const updatedList = sortShoppingListOnDate(items);
  setShoppingList(updatedList);
  setModalShoppingItem(undefined);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
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
    return;
  }

  if ("id" in editedShoppingItem) {
    // edit a shopping item
    editShoppingItem($formState.get(), editedShoppingItem);
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
