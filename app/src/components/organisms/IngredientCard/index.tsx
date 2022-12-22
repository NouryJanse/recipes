import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import IngredientContainer from './styled'

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
  const navigate = useNavigate()

  return (
    <IngredientContainer
      style={{
        backgroundImage: `url('${'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/800px-Banana-Single.jpg'}')`,
      }}
      onClick={(): void => {
        navigate(`/ingredients/${ingredient.id}`)
      }}
    >
      {withEditButton}
      {withRemovalButton}
      <span className="mb-2 flex">{ingredient.name}</span>
      <div className="mb-2">{ingredient.calorieCount}</div>
      <div className="mb-2">{ingredient.published ? 'yes' : 'no'}</div>
    </IngredientContainer>
  )
}

export default IngredientCard
