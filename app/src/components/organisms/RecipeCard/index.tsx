import React, { useState, useEffect, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiTwotoneEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import classNames from 'classnames'

import RecipeContainer from './styled'
import { deleteRecipe, getRecipes } from '../../../redux/reducers/recipes/recipeSlice'
import { Button } from '../../index'
import { getDifferenceInFormat } from '../../../helpers/DateHelper'
import RootState from '../../../types/RootState'
import courseName from '../../pages/Recipe/EditRecipe/helpers'
import { RECIPE_COURSE_OPTIONS, REPLACEMENT_IMAGE } from '../../../constants'

type RecipeCardProps = {
  recipe: Recipe
  withEditButton?: boolean
  withRemovalButton?: boolean
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, withEditButton, withRemovalButton }): ReactElement => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const [mainImage, setMainImage] = useState<string>('')
  const [isHovering, setIsHovering] = useState(false)

  const onDelete = async (recipeId: number): Promise<boolean> => {
    if (!recipeId) return false
    // @ts-ignore:next-line
    await dispatch(deleteRecipe(recipeId))
    // @ts-ignore:next-line
    await dispatch(getRecipes())
    return true
  }

  const handleMouseEnter = (): void => {
    setIsHovering(true)
  }

  const handleMouseLeave = (): void => {
    setIsHovering(false)
  }

  const showNewLabel = (): boolean => {
    if (recipe.createdAt && getDifferenceInFormat(recipe.createdAt, 'd') < 7) return true
    return false
  }

  useEffect(() => {
    if (recipe?.images?.length) {
      setMainImage(`url('${recipe.images[0].url}')`)
    } else {
      setMainImage(`url('${REPLACEMENT_IMAGE.recipeCard}')`)
    }
  }, [recipe, recipes])

  // Should be styled and moved into a component in the Recipe subfolder
  if (!recipe) return <p>Error, no recipe found.</p>

  return (
    <RecipeContainer
      style={{
        backgroundImage: mainImage,
        boxShadow: !isHovering ? 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)' : 'inset 0 0 0 2000px rgba(0, 0, 0, 0.4)',
      }}
      onClick={(): void => {
        navigate(`/recipes/${recipe.id}`)
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cardAnimation"
    >
      <div
        className={classNames(
          {
            visible: showNewLabel(),
            invisible: !showNewLabel(),
          },
          'inline-flex font-bold text-white border-2 rounded-lg p-1',
        )}
      >
        New!
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-9 md:mt-12 lg:mt-22 xl:mt-28">
        <div className="flex-row">
          <h2 className="font-bold text-white">{recipe.name}</h2>

          <p className="flex xl:hidden text-white">
            <i>{courseName(recipe.course ? recipe.course : '', RECIPE_COURSE_OPTIONS)}</i>
          </p>
        </div>

        {(withEditButton || withRemovalButton) && (
          <div className="flex align-end">
            {withEditButton && (
              <Button
                type="button"
                classes="mr-2 h-max"
                onClick={(e: Event): void => {
                  e.stopPropagation()
                  navigate(`/recipes/${recipe.id}/edit`)
                }}
                buttonStyle="secondary"
                noedge
              >
                <AiTwotoneEdit />
              </Button>
            )}

            {withRemovalButton && (
              <Button
                type="button"
                classes="h-max"
                onClick={(e: Event): void => {
                  e.stopPropagation()
                  onDelete(recipe.id)
                }}
                buttonStyle="primary"
                noedge
              >
                <MdDelete />
              </Button>
            )}
          </div>
        )}
      </div>
    </RecipeContainer>
  )
}

RecipeCard.defaultProps = {
  withEditButton: false,
  withRemovalButton: false,
}

export default RecipeCard
