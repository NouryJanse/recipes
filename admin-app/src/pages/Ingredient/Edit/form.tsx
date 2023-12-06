import React, { ChangeEvent, ReactElement } from 'react'
import { Button, Dropdown, FieldContainer, Number, Textfield, Toggle } from '../../../components'
import { Link } from 'react-router-dom'
import { INGREDIENT_UNITS } from '../../../constants'

type FormProps = {
  handleSubmit: any
  register: any
  errors: any
  unit: any
  setUnit: any
  setValue: any
  handleToggle: any
  toggle: any
  onSave: any
  formRef: any
  ingredient: any
  btnClasses: any
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  register,
  errors,
  unit,
  setUnit,
  setValue,
  handleToggle,
  toggle,
  onSave,
  formRef,
  ingredient,
  btnClasses,
}): ReactElement => {
  return (
    <form onSubmit={handleSubmit(onSave)} {...formRef}>
      <FieldContainer>
        <Textfield
          name="name"
          type="text"
          label="Ingredient name*"
          defaultValue={ingredient.name}
          placeholder="Fill in a name"
          validation={{
            required: 'Did you forget to name your ingredient?',
          }}
          register={register}
          errors={errors.name}
        />
      </FieldContainer>

      {/* <FieldContainer>
        <Dropdown
          name="unit"
          label="Ingredient unit type*"
          defaultValue={unit}
          disabled={false}
          validation={{
            required: 'Did you forget to fill in the unit of your ingredient?',
          }}
          register={register}
          errors={errors.unit}
          options={INGREDIENT_UNITS}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            setUnit(event.target.value)
            setValue('unit', event.target.value)
          }}
        />
      </FieldContainer> */}

      {/* <FieldContainer>
        <Number
          name="calorieCount"
          label="Calories"
          defaultValue={ingredient.calorieCount}
          placeholder="Enter the number of calories"
          validation={{
            required: 'Did you forget to enter the calories?',
          }}
          register={register}
          errors={errors.description}
        />
      </FieldContainer> */}

      <FieldContainer>
        <Toggle
          handleToggle={(): void => handleToggle()}
          name="published"
          label="Enable ingredient"
          register={register}
          checked={toggle}
        />
      </FieldContainer>

      <Button type="submit" label="Save ingredient" classes={btnClasses} disabled={false} />

      <Link to="/ingredients">Back to ingredients</Link>
    </form>
  )
}

export default Form
