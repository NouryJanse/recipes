import type { TypeShoppingItem } from "../services/types.db";

const deleteObjectWithIdFromArray = (array: TypeShoppingItem[], id: string): TypeShoppingItem[] => {
  return array.filter((a) => {
    return a.id === id ? null : a;
  });
};

export default deleteObjectWithIdFromArray;
