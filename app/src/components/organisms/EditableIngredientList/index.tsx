import { ReactElement } from 'react'
import { EditLinkedIngredient } from '../..'

interface EditableIngredientListProps {
  ingredients: RecipeIngredient[]
  recipe: Recipe
}

type LocalUnit = {
  id: number
  unit: string | undefined
}

const EditableIngredientList: React.FC<EditableIngredientListProps> = ({ ingredients, recipe }): ReactElement => {
  return (
    <div>
      {ingredients.map((linkedIngredient: RecipeIngredient) => {
        return <EditLinkedIngredient key={linkedIngredient.id} ingredient={linkedIngredient} recipe={recipe} />
      })}
    </div>
  )
}

export default EditableIngredientList
