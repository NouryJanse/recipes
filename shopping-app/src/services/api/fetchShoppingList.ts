import { mongodb } from '../db'
import { $user } from '../store'

const fetchShoppingList = async () => {
    const DB_NAME: string = import.meta.env.DB_NAME as string
    const COLLECTION_NAME: string = import.meta.env.COLLECTION_NAME as string
    let db = mongodb.db(DB_NAME)
    let collection = db.collection(COLLECTION_NAME)
    const userId = $user.get()?.id

    if (userId) {
        return await collection.findOne({ userId })
    }
}

export { fetchShoppingList }
