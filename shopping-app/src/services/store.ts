import { atom } from "nanostores";
import type { TypeShoppingItem, User } from "./types.db";
import type { FormStateType } from "../components/CreateShoppingItemModal";

export const $user = atom<User | undefined>();
export const $list = atom<TypeShoppingItem[]>([]);
export const $modalShoppingItem = atom<FormStateType | undefined>(undefined);

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
