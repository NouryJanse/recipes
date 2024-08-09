const sortShoppingListOnDate = <T extends { updatedAt: string }>(shoppingList: T[]) => {
    if (!shoppingList || !shoppingList.length) return []
    return shoppingList.sort((a: T, b: T) => {
        if (a.updatedAt < b.updatedAt) return 1
        return -1
    })
}

export default sortShoppingListOnDate
