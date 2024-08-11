import React, { ReactElement, useState } from 'react'
import Heading from '../../../../atoms/Typography/Heading'
import AddRecipeIngredient from '../Add'
import EditLinkedIngredient from '../Edit'
import { Button, FieldContainer } from '../../../../index'

type WrapperRecipeIngredientsType = {
    recipe: Recipe
}

const WrapperRecipeIngredients: React.FC<WrapperRecipeIngredientsType> = ({
    recipe,
}): ReactElement => {
    const [show, setShow] = useState<boolean>(false)

    return (
        <FieldContainer classes="mt-6">
            <>
                <div className="flex flex-row">
                    <Heading headingLevel="h2" extraClasses="mr-8">
                        Ingredients
                    </Heading>

                    <Button
                        type="submit"
                        buttonStyle="secondary"
                        label={show ? 'x Hide new ingredient' : '+ Add ingredient'}
                        onClick={() => setShow(!show)}
                    />
                </div>

                {show && <AddRecipeIngredient recipe={recipe} setShowAdd={setShow} />}

                {recipe.ingredients && recipe.ingredients.length ? (
                    <>
                        {recipe.ingredients.map((linkedIngredient: RecipeIngredient) => {
                            return (
                                <EditLinkedIngredient
                                    key={linkedIngredient.id}
                                    ingredient={linkedIngredient}
                                    recipeId={recipe.id}
                                />
                            )
                        })}
                    </>
                ) : (
                    'Add ingredients to your recipe and they will show up here..'
                )}
            </>
        </FieldContainer>
    )
}

export default WrapperRecipeIngredients
