import { useDeleteRecipeMutation } from '../../../../redux/reducers/recipes/recipes'

const onDelete = () => {
    const [deleteRecipe, { isLoading, isError, isSuccess }] = useDeleteRecipeMutation()
    const execute = async (recipeId: number): Promise<boolean> => {
        if (!recipeId) return false
        await deleteRecipe(recipeId)
        return true
    }
    return { isLoading, isError, isSuccess, execute }
}

export default onDelete
