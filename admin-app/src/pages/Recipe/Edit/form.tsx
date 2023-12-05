import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Dropdown, FieldContainer, Images, Textarea, Textfield, Toggle } from '../../../components'
import { RECIPE_COURSE_OPTIONS } from '../../../constants'

type FormProps = {
  handleSubmit: any
  onSave: any
  formRef: any
  register: any
  recipe: any
  errors: any
  setValue: any
  setInitialRecipeLoad: any
  initialRecipeLoad: any
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  onSave,
  formRef,
  register,
  recipe,
  errors,
  setValue,
  setInitialRecipeLoad,
  initialRecipeLoad,
}): ReactElement => {
  const [course, setCourse] = useState(recipe && recipe.course ? recipe.course : '')
  const [toggle, setToggle] = useState(recipe && recipe.published ? recipe.published : false)

  return (
    <>
      <div className="mb-4 mr-4 pr-4">
        <form className="" onSubmit={handleSubmit(onSave)} {...formRef}>
          <FieldContainer>
            <Toggle
              handleToggle={(): void => {
                setValue('published', !toggle)
                setToggle(!toggle)
              }}
              name="published"
              label="Published"
              register={register}
              checked={toggle}
            />
          </FieldContainer>

          <FieldContainer>
            <Textfield
              name="name"
              type="text"
              defaultValue={recipe.name}
              label="Recipe name*"
              placeholder="Fill in a name"
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
              defaultValue={recipe.description}
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
              classes="mb-10"
              validation={{
                required: 'Did you forget to fill in the course of your recipe?',
              }}
              register={register}
              errors={errors.description}
              options={RECIPE_COURSE_OPTIONS}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                setCourse(event.target.value)
                setValue('course', event.target.value)
              }}
            />
          </FieldContainer>

          <Images
            register={register}
            recipe={recipe}
            setValue={setValue}
            setInitialRecipeLoad={setInitialRecipeLoad}
            initialRecipeLoad={initialRecipeLoad}
          />
        </form>
      </div>
    </>
  )
}

export default Form
