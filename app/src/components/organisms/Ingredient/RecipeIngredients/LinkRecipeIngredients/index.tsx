import React, { ReactElement } from 'react'
import FieldContainer from '../../../../molecules/Form/FieldContainer'
import Heading from '../../../../atoms/Typography/Heading'
import AddRecipeIngredient from '../AddRecipeIngredient'
import EditLinkedIngredient from '../EditLinkedIngredient'

type WrapperRecipeIngredientsType = {
  id: string
  recipe: Recipe
}

const WrapperRecipeIngredients: React.FC<WrapperRecipeIngredientsType> = ({ id, recipe }): ReactElement => {
  return (
    <div>
      <FieldContainer classes="border-b-1 border-cyan border-solid">
        <>
          {/* <Heading headingLevel="h2" extraClasses="">
            New ingredient
          </Heading> */}
          {id && <AddRecipeIngredient recipe={recipe} />}
        </>
      </FieldContainer>

      <FieldContainer classes="mt-6">
        <>
          {recipe.ingredients && recipe.ingredients.length ? (
            <>
              <Heading headingLevel="h2" extraClasses="">
                Ingredients
              </Heading>

              {recipe.ingredients.map((linkedIngredient: RecipeIngredient) => {
                return <EditLinkedIngredient key={linkedIngredient.id} ingredient={linkedIngredient} recipe={recipe} />
              })}
            </>
          ) : (
            ''
          )}
        </>
      </FieldContainer>
    </div>
  )
}

export default WrapperRecipeIngredients
