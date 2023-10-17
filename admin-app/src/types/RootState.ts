import ApplicationState from './ApplicationState'
import IngredientState from './IngredientState'
import RecipeState from './RecipeState'
import UserState from './UserState'

export default interface RootState {
  applicationSlice: ApplicationState
  ingredientSlice: IngredientState
  recipeSlice: RecipeState
  userSlice: UserState
}
