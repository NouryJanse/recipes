import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe } from '../../redux/reducers/recipes/recipeSlice'
import { useNavigate } from 'react-router-dom'

import { Textfield, Button, Textarea, Dropdown, FieldContainer } from '../../components'
import RootState from '../../types/RootState'
import REDUX_STATE from '../../constants/REDUX_STATE'
import RECIPE_COURSE_OPTIONS from '../../constants/RECIPE_COURSE_OPTIONS'

const CreateRecipe = () => {
  const status = useSelector((state: RootState) => state.recipeSlice.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = async (data: object) => {
    // @ts-ignore:next-line
    const response = await dispatch(createRecipe(data))
    if (status.createRecipe === REDUX_STATE.FULFILLED) {
      navigate('/recipes')
    } else if (status.createRecipe === REDUX_STATE.REJECTED) {
      console.log(response)
      console.log(status.createRecipe)
    } else {
      // this situation is not handled yet..
    }
  }

  useEffect(() => {
    if (status.createRecipe === 'rejected') {
      throw new Error('An error occurred, the recipe was not created.')
    }
  }, [status])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldContainer>
        <Textfield
          name="name"
          type="text"
          label="Recipe title*"
          placeholder="Fill in a title"
          validation={{
            required: 'Did you forget to name your recipe?',
          }}
          register={register}
          errors={errors.name?.type === 'required' && 'Title is required'}
        />
      </FieldContainer>

      <FieldContainer>
        <Textarea
          name="description"
          label="Recipe description*"
          placeholder="Fill in a description"
          validation={{
            required: 'Did you forget to fill in the description of your recipe?',
          }}
          register={register}
          errors={errors.description?.type === 'required' && 'Description is required'}
        />
      </FieldContainer>

      <FieldContainer>
        <Dropdown
          name="course"
          label="Course*"
          defaultValue={''}
          disabled={false}
          onChange={(course) => setValue('course', course)}
          validation={{
            required: 'Did you forget to fill in the course of your recipe?',
          }}
          register={register}
          errors={errors.description?.type === 'required' && 'Course is required'}
          options={RECIPE_COURSE_OPTIONS}
        />
      </FieldContainer>

      <Button type="submit" label="Save recipe" />
    </form>
  )
}

export default CreateRecipe
