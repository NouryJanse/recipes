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
  const [numberOfPersons, setNumberOfPersons] = useState(recipe && recipe.numberOfPersons ? recipe.numberOfPersons : 2)
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
            <div className="flex flex-row align-middle mb-6 justify-between">
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
                classes="mr-2"
              />

              <Dropdown
                name="course"
                label="Course*"
                defaultValue={course}
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

              <Dropdown
                name="numberOfPersons"
                label={`Amount of persons`}
                defaultValue={numberOfPersons}
                validation={{
                  required: '',
                }}
                register={register}
                errors={errors.description}
                options={[
                  { id: 0, text: 'Make a choice', value: '', disabled: false },
                  { id: 1, text: '1 person', value: '1', disabled: false },
                  { id: 2, text: '2 persons', value: '2', disabled: false },
                  { id: 3, text: '3 persons', value: '3', disabled: false },
                  { id: 4, text: '4 persons', value: '4', disabled: false },
                  { id: 5, text: '5 persons', value: '5', disabled: false },
                  { id: 6, text: '6 persons', value: '6', disabled: false },
                  { id: 7, text: '7 persons', value: '7', disabled: false },
                  { id: 8, text: '8 persons', value: '8', disabled: false },
                  { id: 9, text: '9 persons', value: '9', disabled: false },
                  { id: 10, text: '10 persons', value: '10', disabled: false },
                ]}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                  setNumberOfPersons(Number.parseInt(event.target.value))
                  setValue('numberOfPersons', Number.parseInt(event.target.value))
                }}
              />
            </div>
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
