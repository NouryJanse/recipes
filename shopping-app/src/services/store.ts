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
export const $list = atom<TypeShoppingItem[]>([]);
export const $modalShoppingItem = atom<FormStateType | undefined>(undefined);

export function setFormState(formState: FormStateType) {
  $formState.set(formState);
}

export function resetFormState() {
  $formState.set(initialShoppingItemModalData);
}

export function setUser(user: User) {
  $user.set(user);
}

export function setShoppingList(list: TypeShoppingItem[]) {
  // $users.set([...$users.get(), user]);
  $list.set(list);
}

export function setModalShoppingItem(item: FormStateType | undefined) {
  $modalShoppingItem.set(item);
}
