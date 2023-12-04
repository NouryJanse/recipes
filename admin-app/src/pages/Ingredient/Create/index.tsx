import React, { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateIngredientMutation } from '../../../redux/reducers/ingredients/ingredients'

import { ROUTES } from '../../../constants'
import Form from './form'
import { PageTitle } from '../../../components'

const CreateIngredient: React.FC = (): ReactElement => {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const [unit, setUnit] = useState<string>('')
  const [createIngredient] = useCreateIngredientMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()

  const onSubmit = async (data: object): Promise<void> => {
    // @ts-ignore:next-line
    await createIngredient({ ...data, calorieCount: Number.parseInt(data.calorieCount) })
    navigate(ROUTES.INGREDIENTS)
  }

  const handleToggle = (): void => {
    setValue('published', !toggle)
    setToggle(!toggle)
  }

  const saveAndAddAnother = async (): Promise<void> => {
    handleSubmit(async (data) => {
      // @ts-ignore:next-line
      await createIngredient({ ...data, calorieCount: Number.parseInt(data.calorieCount) })
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
