import { atom } from "nanostores";
import type { TypeShoppingItem, User } from "./types.db";

export interface FormStateType {
  amount: string;
  ingredientName: string;
  unit: string;
}

export const initialShoppingItemModalData: FormStateType = {
  amount: "",
  ingredientName: "",
  unit: "",
};

export const $formState = atom<FormStateType>(initialShoppingItemModalData);
export const $user = atom<User | undefined>();
export const $shoppingList = atom<TypeShoppingItem[]>([]);
export const $recipesList = atom<Recipe[]>([]);
export const $modalShoppingItem = atom<TypeShoppingItem | undefined>(undefined);

export function setFormState(formState: FormStateType) {
  $formState.set(formState);
}

export function resetFormState() {
  $formState.set(initialShoppingItemModalData);
}

export function setUser(user: User) {
  $user.set(user);
}

export function setShoppingList(shoppingList: TypeShoppingItem[]) {
  $shoppingList.set(shoppingList);
}

export function addItemToShoppingList(item: TypeShoppingItem) {
  $shoppingList.set([item, ...$shoppingList.get()]);
}

export function addItemToRecipesList(item: Recipe) {
  $recipesList.set([item, ...$recipesList.get()]);
}

export function setModalShoppingItem(item: TypeShoppingItem | undefined) {
  if (item) {
    $modalShoppingItem.set(item);
  } else {
    $modalShoppingItem.set(undefined);
  }
}
