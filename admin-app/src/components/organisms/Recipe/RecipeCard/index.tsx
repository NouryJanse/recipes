import React, { useState, useEffect, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiTwotoneEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { Button } from '../../../index'
import { getDifferenceInFormat } from '../../../../helpers/DateHelper'
import courseName from '../../../../pages/Recipe/Edit/helpers'
import { RECIPE_COURSE_OPTIONS, REPLACEMENT_IMAGE } from '../../../../constants'
import { useGetRecipesQuery } from '../../../../redux/reducers/recipes/recipes'
import onDelete from './deleteRecipe'
import clsx from 'clsx'

type RecipeCardProps = {
  recipe: Recipe
  withEditButton?: boolean
  withRemovalButton?: boolean
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, withEditButton, withRemovalButton }): ReactElement => {
  const navigate = useNavigate()
  const { data: recipes } = useGetRecipesQuery()
  const [mainImage, setMainImage] = useState<string>('')
  const [isHovering, setIsHovering] = useState(false)
  const { execute } = onDelete()

  useEffect(() => {
    if (recipe?.images?.length) {
      setMainImage(`url('${recipe.images[0].url}')`)
    } else {
      setMainImage(`url('${REPLACEMENT_IMAGE.recipeCard}')`)
    }
  }, [recipe, recipes])

  if (!recipe) return <p>Error, no recipe found.</p>

  const newClasses = clsx('inline-flex font-bold text-white border-2 rounded-lg p-1', {
    visible: showNewLabel(recipe),
    invisible: !showNewLabel(recipe),
  })

  return (
    <div
      style={{
        backgroundImage: mainImage,
        boxShadow: !isHovering ? 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)' : 'inset 0 0 0 2000px rgba(0, 0, 0, 0.4)',
      }}
      onClick={(): void => {
        navigate(`/recipes/${recipe.id}`)
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="cardAnimation mb-6 p-4 rounded-lg border-transparent bg-center bg-cover hover:cursor-pointer transition-all"
    >
      <div className={newClasses}>New!</div>

      <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-9 md:mt-12 lg:mt-22 xl:mt-28">
        <div className="flex-row">
          <h2 className="font-bold text-white bg-white/[0.3] py-0.5 px-2 rounded-md">{recipe.name}</h2>

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
                  execute(recipe.id)
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
    </div>
  )
}

RecipeCard.defaultProps = {
  withEditButton: false,
  withRemovalButton: false,
}

const showNewLabel = (recipe): boolean => {
  if (recipe.createdAt && getDifferenceInFormat(recipe.createdAt, 'd') < 7) return true
  return false
}

export default RecipeCard
