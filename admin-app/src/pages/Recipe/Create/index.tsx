import React, { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createRecipe, getRecipes, resetCreateRecipeStatus } from '../../../redux/reducers/recipes/recipeSlice'
import { PageTitle } from '../../../components'
import RootState from '../../../types/RootState'
import { REDUX_STATE, ROUTES } from '../../../constants'
import Form from './form'

const CreateRecipe: React.FC = (): ReactElement => {
  const status = useSelector((state: RootState) => state.recipeSlice.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [course, setCourse] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = async (data: object): Promise<void> => {
    // @ts-ignore:next-line
    dispatch(createRecipe(data))
  }

  useEffect(() => {
    switch (status.createRecipe) {
      case REDUX_STATE.FULFILLED:
        dispatch(resetCreateRecipeStatus())
        // @ts-ignore:next-line
        dispatch(getRecipes())
        navigate(ROUTES.RECIPES_LIST)
        break

      case REDUX_STATE.REJECTED:
        throw new Error('An error occurred, the recipe was not created.')

      default:
        break
    }
  }, [status])

  return (
    <div className="pt-7">
      <PageTitle text="Create a delicous meal" />

      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        course={course}
        setCourse={setCourse}
        setValue={setValue}
      />
    </div>
  )
}

export default CreateRecipe
