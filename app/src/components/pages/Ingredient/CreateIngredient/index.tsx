import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RootState from '../../../../types/RootState'
import { Textfield, Button, Toggle, FieldContainer, PageTitle, Number, Dropdown } from '../../..'

import {
  createIngredient,
  getIngredients,
  resetCreateIngredientStatus,
} from '../../../../redux/reducers/ingredients/ingredientSlice'
import { INGREDIENT_UNITS, REDUX_STATE, ROUTES } from '../../../../constants'

const CreateIngredient: React.FC = (): ReactElement => {
  const status = useSelector((state: RootState) => state.ingredientSlice.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const [unit, setUnit] = useState<string>('')
  const [redirectAfterSubmit, setRedirectAfterSubmit] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()

  useEffect(() => {
    switch (status.createIngredient) {
      case REDUX_STATE.FULFILLED:
        // @ts-ignore:next-line
        dispatch(getIngredients())
        dispatch(resetCreateIngredientStatus())
        if (redirectAfterSubmit) {
          navigate(ROUTES.INGREDIENTS)
          setRedirectAfterSubmit(true)
        }
        break

      case REDUX_STATE.REJECTED:
        throw new Error('An error occurred, the recipe was not created.')

      default:
        break
    }
  }, [status])

  const onSubmit = async (data: object): Promise<void> => {
    setRedirectAfterSubmit(true)
    // @ts-ignore:next-line
    dispatch(createIngredient(data))
  }

  const handleToggle = (): void => {
    setValue('published', !toggle)
    setToggle(!toggle)
  }

  const saveAndAddAnother = async (): Promise<void> => {
    handleSubmit(async (data) => {
      // @ts-ignore:next-line
      dispatch(createIngredient(data))
      reset()
      setUnit('')
      setToggle(false)
    })()
  }

  return (
    <div className="pt-7">
      <div className="mb-16">
        <PageTitle text="Add a new ingredient to the platform" />
      </div>

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
            errors={errors.name}
          />
        </FieldContainer>

        <FieldContainer>
          <Dropdown
            name="unit"
            label="Ingredient unit type*"
            defaultValue={unit}
            register={register}
            validation={{
              required: 'Did you forget to fill in the unit of your ingredient?',
            }}
            errors={errors.unit}
            options={INGREDIENT_UNITS}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              setUnit(event.target.value)
              setValue('unit', event.target.value)
            }}
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
            errors={errors.calorieCount}
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

        <Button type="submit" label="Save ingredient" classes="mb-4" />
        <Button type="button" label="Save and add another" onClick={saveAndAddAnother} />
      </form>
    </div>
  )
}

export default CreateIngredient
