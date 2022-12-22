import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RootState from '../../../types/RootState'
import { Textfield, Button, Toggle, FieldContainer, PageTitle, Number } from '../..'

import { createIngredient } from '../../../redux/reducers/ingredients/ingredientSlice'
import { ROUTES } from '../../../constants'

const CreateIngredient: React.FC = (): ReactElement => {
  const status = useSelector((state: RootState) => state.ingredientSlice.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()

  const onSubmit = async (data: object): Promise<void> => {
    // @ts-ignore:next-line
    dispatch(createIngredient(data))
    navigate(ROUTES.INGREDIENTS)
  }

  const handleToggle = (): void => {
    setValue('published', !toggle)
    setToggle(!toggle)
  }

  const saveAndAddAnother = async (): Promise<void> => {
    handleSubmit(async (data) => {
      // @ts-ignore:next-line
      dispatch(createIngredient(data))
      // reset()
    })()
  }

  return (
    <div className="pt-7">
      <PageTitle text="Add a new ingredient to the platform" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldContainer>
          <Textfield
            name="name"
            type="text"
            label="Ingredient name*"
            placeholder="Fill in a name"
            validation={{
              required: 'Did you forget to name your ingredient?',
            }}
            register={register}
            errors={errors.name?.type === 'required' && 'Ingredient name is required'}
          />
        </FieldContainer>

        <FieldContainer>
          <Number
            name="calorieCount"
            label="Number of calories*"
            placeholder="Enter the amount of calories"
            validation={{
              required: 'Did you forget to enter the amount of calories?',
            }}
            register={register}
            errors={errors.name?.type === 'required' && 'Calories are required'}
          />
        </FieldContainer>

        <FieldContainer>
          <Toggle
            handleToggle={(): void => handleToggle()}
            name="published"
            label="Enable ingredient"
            register={register}
            checked={toggle}
          />
        </FieldContainer>

        <Button type="submit" label="Save ingredient" />
        <Button type="button" label="Save and add another" onClick={saveAndAddAnother} />
      </form>
    </div>
  )
}

export default CreateIngredient
