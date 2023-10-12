import React, { ReactElement } from 'react'
import FieldContainer from '../../../../molecules/Form/FieldContainer'
import Heading from '../../../../atoms/Typography/Heading'
import AddRecipeIngredient from '../Add'
import EditLinkedIngredient from '../Edit'

type WrapperRecipeIngredientsType = {
  id: string
  recipe: Recipe
}

const WrapperRecipeIngredients: React.FC<WrapperRecipeIngredientsType> = ({ id, recipe }): ReactElement => {
  return (
    <div>
      <FieldContainer classes="border-b-1 border-cyan border-solid">
        {id ? <AddRecipeIngredient recipe={recipe} /> : <div></div>}
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
