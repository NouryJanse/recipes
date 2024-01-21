import { atom } from "nanostores";
import type { TypeShoppingItem, User } from "./types.db";
import { updateLocalStorage } from "../helpers/updateLocalStorage";

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

// USER
export const $user = atom<User | undefined>();
export function setUser(user: User) {
  if (user) {
    $user.set(user);
  }
}

export function getUser() {
  return $user.get();
}

// INGREDIENT MODAL
export const $formState = atom<FormStateType>(initialShoppingItemModalData);
export function setFormState(formState: FormStateType) {
  $formState.set(formState);
}

export function resetFormState() {
  $formState.set(initialShoppingItemModalData);
}

export const $modalShoppingItem = atom<TypeShoppingItem | undefined>(undefined);
export function setModalShoppingItem(item: TypeShoppingItem | undefined) {
  if (item) {
    $modalShoppingItem.set(item);
  } else {
    $modalShoppingItem.set(undefined);
  }
}

// SHOPPING LIST
export const $shoppingList = atom<TypeShoppingItem[]>([]);
export function setShoppingList(shoppingList: TypeShoppingItem[]) {
  $shoppingList.set(shoppingList);
  updateLocalStorage();
}

export function getShoppingList(): TypeShoppingItem[] {
  const list: TypeShoppingItem[] = $shoppingList.get();
  if (list && list.length) return list;
  return [];
}

// RECIPE MODAL
export const $modalRecipeItem = atom<Recipe | undefined>(undefined);
export function setModalRecipeItem(item: any) {
  $modalRecipeItem.set(item);
}

export const $shoppingListRecipes = atom<Recipe[]>([]);
export function setShoppingListRecipes(shoppingListRecipes: Recipe[]) {
  $shoppingListRecipes.set(shoppingListRecipes);
  updateLocalStorage();
}

export function getShoppingListRecipes(): Recipe[] {
  const list: Recipe[] = $shoppingListRecipes.get();
  if (list && list.length) return list;
  return [];
}

// SOCKET
export const $socketClient = atom<any | undefined>(undefined);
export function setSocket(socket: any) {
  if (socket) $socketClient.set(socket);
}

// CONTENT SWITCHER
export const $contentSwitcher = atom<"groceries" | "recipes" | "planning">("groceries");
export function setContentSwitcher(content: "groceries" | "recipes" | "planning"): void {
  $contentSwitcher.set(content);
}

// MODAL BOOLEANS
export const $groceryItemModalOpened = atom<boolean>(false);
export function setGroceryItemModalOpened(bool: boolean) {
  $groceryItemModalOpened.set(bool);
}

export const $ingredientsModalOpened = atom<boolean>(false);
export function setIngredientsModalOpened(bool: boolean) {
  $ingredientsModalOpened.set(bool);
}

export const $planningModalOpened = atom<boolean>(false);
export function setPlanningModalOpened(bool: boolean) {
  $planningModalOpened.set(bool);
}
