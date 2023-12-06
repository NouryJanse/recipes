import React, { ChangeEvent, ReactElement } from 'react'
import { Button, Dropdown, FieldContainer, Number, Textfield, Toggle } from '../../../components'
import { INGREDIENT_UNITS } from '../../../constants'

type FormProps = {
  handleSubmit: any
  onSubmit: any
  register: any
  errors: any
  unit: any
  setUnit: any
  setValue: any
  handleToggle: any
  toggle: any
  saveAndAddAnother: any
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  unit,
  setUnit,
  setValue,
  handleToggle,
  toggle,
  saveAndAddAnother,
}): ReactElement => {
  return (
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

      {/* <FieldContainer>
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
      </FieldContainer> */}

      {/* <FieldContainer>
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

      <Button type="submit" label="Save ingredient" classes="mb-4" />
      <Button type="button" label="Save and add another" onClick={saveAndAddAnother} />
    </form>
  )
}

export default Form
