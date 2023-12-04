import React, { ChangeEvent, ReactElement } from 'react'
import { Dropdown, FieldContainer, Images, Textarea, Textfield, Toggle } from '../../../components'
import { RECIPE_COURSE_OPTIONS } from '../../../constants'

type FormProps = {
  handleSubmit: any
  onSave: any
  formRef: any
  handleToggle: any
  register: any
  toggle: any
  recipe: any
  errors: any
  course: any
  setCourse: any
  setValue: any
  setInitialRecipeLoad: any
  initialRecipeLoad: any
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  onSave,
  formRef,
  handleToggle,
  register,
  toggle,
  recipe,
  errors,
  course,
  setCourse,
  setValue,
  setInitialRecipeLoad,
  initialRecipeLoad,
}): ReactElement => {
  return (
    <>
      <div className="mb-4 mr-4 pr-4">
        <form className="" onSubmit={handleSubmit(onSave)} {...formRef}>
          <FieldContainer>
            <Toggle
              handleToggle={(): void => handleToggle()}
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
              register={register}
              classes="mb-10"
              validation={{
                required: 'Did you forget to fill in the course of your recipe?',
              }}
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
