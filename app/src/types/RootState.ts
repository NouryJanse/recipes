import RecipeState from './RecipeState'
import ApplicationState from './ApplicationState'
import UserState from './UserState'

export default interface RootState {
  recipeSlice: RecipeState
  applicationSlice: ApplicationState
  userSlice: UserState
}
