import React, { ReactElement, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { formatNLDateTime } from '../../../helpers/DateHelper'
import REPLACEMENT_IMAGES from '../../../constants/REPLACEMENT_IMAGES'
import Navigation from './navigation'
import { useDeleteRecipeMutation, useGetRecipeQuery } from '../../../redux/reducers/recipes/recipes'

const RecipeDetail: React.FC = (): ReactElement => {
  const [id, setId] = useState<number>(-1)
  const [skip, setSkip] = useState<boolean>(true)
  const navigate = useNavigate()
  const params = useParams()
  const { data, error, isLoading } = useGetRecipeQuery(id, {
    skip,
  })
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation()

  useEffect(() => {
    if (params.recipeId !== undefined) {
      setId(Number.parseInt(params.recipeId, 10))
      setSkip(false)
    }
  }, [params.recipeId])

  const onDelete = async (recipeId: number): Promise<boolean> => {
    if (!recipeId) return false
    await deleteRecipe(id).unwrap()
    navigate('/recipes')
    return true
  }

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>loading...</>
      ) : data ? (
        <>
          <div>
            <div
              style={{
                backgroundImage:
                  data.images && data.images.length
                    ? `url('${data.images[0].url}')`
                    : `url('${REPLACEMENT_IMAGES.recipeCard}')`,
                boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.18)',
              }}
              className="relative mb-16 bg-cover bg-no-repeat bg-center overflow-hidden"
            >
              <h1 className="text-xl xl:text-4xl font-bold pt-32 pb-32 pl-10 text-white">{data.name}</h1>
            </div>

            <div className="mb-4">
              {data.updatedAt && <p>Updated: {formatNLDateTime(data.updatedAt)}</p>}
              {data.createdAt && <p>Created: {formatNLDateTime(data.createdAt)}</p>}
            </div>

            {data.description && <p className="mb-4">{data.description}</p>}

            <i className="block mb-4">{data.course}</i>

            <Navigation recipe={data} onDelete={onDelete} />
          </div>
        </>
      ) : null}
    </>
  )
}

export default RecipeDetail
