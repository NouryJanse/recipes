import React, { ReactElement } from 'react'
import FieldContainer from '../../../../molecules/Form/FieldContainer'
import Heading from '../../../../atoms/Typography/Heading'
import AddRecipeIngredient from '../AddRecipeIngredient'
import EditableIngredientList from '../EditableIngredientList'

type LinkRecipeIngredientsType = {
  id: string
  recipe: Recipe
}

const LinkRecipeIngredients: React.FC<LinkRecipeIngredientsType> = ({ id, recipe }): ReactElement => {
  return (
    <div>
      <FieldContainer>
        <>
          <Heading headingLevel="h2" extraClasses="">
            New ingredient
          </Heading>
          {id && <AddRecipeIngredient recipe={recipe} />}
        </>
      </FieldContainer>
      <FieldContainer>
        <>
          <Heading headingLevel="h2" extraClasses="">
            Ingredients
          </Heading>

          {recipe.ingredients && recipe.ingredients.length ? (
            <EditableIngredientList ingredients={recipe.ingredients} recipe={recipe} />
          ) : (
            ''
          )}
        </>
      </FieldContainer>
    </div>
  )
}

export default LinkRecipeIngredients
