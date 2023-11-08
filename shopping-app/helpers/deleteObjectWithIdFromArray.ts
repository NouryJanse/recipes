import type { TypeShoppingItem } from "../src/services/types.db";

const deleteObjectWithIdFromArray = (array: TypeShoppingItem[], id: string): TypeShoppingItem[] => {
  return array.filter((a) => {
    return a.id === id ? null : a;
  });
};

export default deleteObjectWithIdFromArray;
