import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createRecipe, getRecipes, resetCreateRecipeStatus } from '../../../redux/reducers/recipes/recipeSlice'
import { Textfield, Button, Textarea, Dropdown, FieldContainer, PageTitle } from '../../../components'
import RootState from '../../../types/RootState'
import { RECIPE_COURSE_OPTIONS, REDUX_STATE, ROUTES } from '../../../constants'

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
      <div className="mb-16">
        <PageTitle text="Create a delicous meal" />
      </div>

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
            errors={errors.name}
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
            errors={errors.description}
          />
        </FieldContainer>

        <FieldContainer>
          <Dropdown
            name="course"
            label="Course*"
            defaultValue={course}
            disabled={false}
            onChange={(changedCourse: ChangeEvent<HTMLInputElement>): void => {
              setCourse(changedCourse.target.value)
              setValue('course', changedCourse.target.value)
            }}
            validation={{
              required: 'Did you forget to fill in the course of your recipe?',
              validate: {
                stillRequired: (value: string) => value !== 'choice',
              },
            }}
            register={register}
            errors={errors.course}
            options={RECIPE_COURSE_OPTIONS}
          />
        </FieldContainer>

        <Button type="submit" label="Save recipe" />
      </form>
    </div>
  )
}

export default CreateRecipe