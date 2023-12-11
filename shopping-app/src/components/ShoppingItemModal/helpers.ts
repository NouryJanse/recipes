import { nanoid } from "nanoid";
import type { TypeShoppingItem } from "../../services/types.db";
import sortShoppingListOnDate from "../../helpers/sortShoppingListOnDate";
import {
  $formState,
  $list,
  resetFormState,
  setFormState,
  setModalShoppingItem,
  setShoppingList,
  type FormStateType,
} from "../../services/store";
import replaceShoppingItemInList from "../../helpers/replaceShoppingItemInList";
import { syncToSocket, updateLocalStorage } from "../ShoppingList/helpers";

const createShoppingItem = (formState: FormStateType, editedShoppingItem?: TypeShoppingItem): TypeShoppingItem => {
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

const handleOnAdd = (formState: FormStateType) => {
  const newShoppingItem = createShoppingItem(formState, undefined);
  const updatedList = sortShoppingListOnDate([...$list.get(), newShoppingItem]);

  setShoppingList(updatedList);
  setModalShoppingItem(undefined);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

const handleOnEdit = (formState: FormStateType, editedShoppingItem: TypeShoppingItem) => {
  const newShoppingItem = createShoppingItem(formState, editedShoppingItem);
  const items = replaceShoppingItemInList($list.get(), editedShoppingItem, newShoppingItem);
  const updatedList = sortShoppingListOnDate(items);

  setShoppingList(updatedList);
  setModalShoppingItem(undefined);
  updateLocalStorage(updatedList);
  syncToSocket(updatedList);
};

const handleInputChange = (event: Event): void => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const { name, value } = target;

  setFormState({
    ...$formState.get(),
    [name]: value,
  });
};

const handleOnSubmit = (editedShoppingItem: any) => {
  // editing a shopping item
  if (editedShoppingItem && editedShoppingItem.id) {
    handleOnEdit($formState.get(), editedShoppingItem);
    return;
  }

  // append new shopping item and empty the form
  handleOnAdd($formState.get());
  resetFormState();
  return;
};

export { createShoppingItem, handleOnAdd, handleOnEdit, handleInputChange, handleOnSubmit };
