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
        backgroundImage: `url('${'https://i5.walmartimages.com/asr/5939a6fa-a0d6-431c-88c6-b4f21608e4be.f7cd0cc487761d74c69b7731493c1581.jpeg'}')`,
      }}
      onClick={(): void => {
        navigate(`/ingredients/${ingredient.id}`)
      }}
    >
      {withEditButton}
      {withRemovalButton}
      <span>{ingredient.name}</span>
      <span>{ingredient.calorieCount}</span>
      <span>{ingredient.published}</span>
    </IngredientContainer>
  )
}

export default IngredientCard
