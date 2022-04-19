import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createRecipe } from '../redux/reducers/recipes/recipeSlice'
import { useNavigate } from 'react-router-dom'

import { Textfield, Button, Textarea, Dropdown } from '../components'

const options = [
  { title: 'Make choice', name: '', disabled: true },
  { title: 'Breakfast', name: 'breakfast' },
  { title: 'Lunch', name: 'lunch' },
  { title: 'Aperitivo', name: 'aperitivo' },
  { title: 'Dinner', name: 'dinner' },
]

const CreateRecipe = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (errors) {
    // console.error(errors, new Error(errors));
  }

  const onSubmit = async (data) => {
    await dispatch(createRecipe(data))

    navigate('/recipes')
  }

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
        placeholder="Fill in the course"
        validation={{
          required: 'Did you forget to fill in the course of your recipe?',
        }}
        register={register}
        errors={errors.description?.type === 'required' && 'Course is required'}
        options={options}
      />

      <Button type="submit" label="Save recipe" />
    </form>
  )
}

export default CreateRecipe
