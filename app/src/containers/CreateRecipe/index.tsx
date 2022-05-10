import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe } from '../../redux/reducers/recipes/recipeSlice'
import { useNavigate } from 'react-router-dom'

import { Textfield, Button, Textarea, Dropdown } from '../../components'
import RootState from '../../types/RootState'

// should be moved to fixed constants externally
const options = [
  { text: 'Make a choice', value: 'Make a choice', disabled: true },
  { text: 'Breakfast', value: 'breakfast', disabled: false },
  { text: 'Lunch', value: 'lunch', disabled: false },
  { text: 'Aperitivo', value: 'aperitivo', disabled: false },
  { text: 'Dinner', value: 'dinner', disabled: false },
]

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

  if (errors) {
    // console.error(errors, new Error(errors));
  }

  const onSubmit = async (data: object) => {
    // @ts-ignore:next-line
    const response = await dispatch(createRecipe(data))
    if (status.createRecipe === 'successfull') {
      navigate('/recipes')
    } else if (status.createRecipe === 'rejected') {
      console.log(response)
      console.log(status.createRecipe)
    } else {
      //
    }
  }

  useEffect(() => {
    if (status.createRecipe === 'rejected') {
      throw 'shits going wrong'
    }
  }, [status])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textfield
        type="text"
        label="Recipe title*"
        name="name"
        placeholder="Fill in a title"
        validation={{
          required: 'Did you forget to name your recipe?',
        }}
        register={register}
        errors={errors.title?.type === 'required' && 'Title is required'}
      />

      <Textarea
        label="Recipe description*"
        name="description"
        placeholder="Fill in a description"
        validation={{
          required: 'Did you forget to fill in the description of your recipe?',
        }}
        register={register}
        errors={errors.description?.type === 'required' && 'Description is required'}
      />

      <Dropdown
        label="Course*"
        name="course"
        disabled={false}
        defaultValue={''}
        onChange={(course) => setValue('course', course)}
        // validation={{
        //   required: 'Did you forget to fill in the course of your recipe?',
        // }}
        // register={register}
        // errors={errors.description?.type === 'required' && 'Course is required'}
        options={options}
      />

      <Button type="submit" label="Save recipe" />
    </form>
  )
}

export default CreateRecipe
