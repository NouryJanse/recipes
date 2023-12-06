import React, { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { PageTitle } from '../../../components'
import Form from './form'
import { useCreateRecipeMutation } from '../../../redux/reducers/recipes/recipes'

const CreateRecipe: React.FC = (): ReactElement => {
  const navigate = useNavigate()
  const [course, setCourse] = useState<string>('')
  const [createRecipe, { isLoading }] = useCreateRecipeMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = async (data: object): Promise<void> => {
    // @ts-ignore:next-line
    await createRecipe(data)
    navigate('/recipes')
  }

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
