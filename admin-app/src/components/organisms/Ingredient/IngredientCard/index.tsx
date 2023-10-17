import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiTwotoneEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Button } from '../../..'

import IngredientContainer from './styled'
import { deleteIngredient, getIngredients } from '../../../../redux/reducers/ingredients/ingredientSlice'

type IngredientCardProps = {
  ingredient: Ingredient
  withEditButton?: boolean
  withRemovalButton?: boolean
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  withEditButton,
  withRemovalButton,
}): ReactElement => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isHovering, setIsHovering] = useState(false)

  const onDelete = async (ingredientId: number): Promise<boolean> => {
    if (!ingredientId) return false
    // @ts-ignore:next-line
    await dispatch(deleteIngredient(ingredientId))
    // @ts-ignore:next-line
    await dispatch(getIngredients())
    return true
  }

  const handleMouseEnter = (): void => {
    setIsHovering(true)
  }

  const handleMouseLeave = (): void => {
    setIsHovering(false)
  }

  return (
    <IngredientContainer
      style={{
        backgroundImage: `url('${'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/800px-Banana-Single.jpg'}')`,
        boxShadow: !isHovering ? 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)' : 'inset 0 0 0 2000px rgba(0, 0, 0, 0.4)',
      }}
      onClick={(): void => {
        navigate(`/ingredients/${ingredient.id}`)
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="mb-2 flex">{ingredient.name}</span>
      <div className="mb-2">{ingredient.calorieCount}</div>
      <div className="mb-2">{ingredient.published ? 'Active' : 'Not active'}</div>

      {(withEditButton || withRemovalButton) && (
        <div className="flex align-end">
          {withEditButton && (
            <Button
              type="button"
              classes="mr-2 h-max"
              onClick={(e: Event): void => {
                e.stopPropagation()
                navigate(`/ingredients/${ingredient.id}/edit`)
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
                onDelete(ingredient.id)
              }}
              buttonStyle="primary"
              noedge
            >
              <MdDelete />
            </Button>
          )}
        </div>
      )}
    </IngredientContainer>
  )
}

export default IngredientCard
