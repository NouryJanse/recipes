import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'

const RecipeDetail: React.FC = (): ReactElement => {
  const params = useParams()
  return <div>Detail {params.ingredientId}</div>
}

export default RecipeDetail
