import { mongodb } from "../db";

const fetchShoppingList = async (_id: number) => {
  const DB_NAME: string = import.meta.env.DB_NAME as string;
  const COLLECTION_NAME: string = import.meta.env.COLLECTION_NAME as string;
  let db = await mongodb.db(DB_NAME);
  let collection = await db.collection(COLLECTION_NAME);

  // TODO: fetch USER collection instead of global version.
  let shoppingItems = await collection.find({}).limit(10).toArray();
  return shoppingItems[0];
};

export { fetchShoppingList };
