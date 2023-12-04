import React, { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { REDUX_STATE, ROUTES } from '../../../constants'
import RootState from '../../../types/RootState'
import {
  createIngredient,
  getIngredients,
  resetCreateIngredientStatus,
} from '../../../redux/reducers/ingredients/ingredientSlice'

import Form from './form'
import { PageTitle } from '../../../components'

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
      <PageTitle text="Add a new ingredient to the platform" />
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        unit={unit}
        setUnit={setUnit}
        setValue={setValue}
        handleToggle={handleToggle}
        toggle={toggle}
        saveAndAddAnother={saveAndAddAnother}
      />
    </div>
  )
}

export default CreateIngredient
