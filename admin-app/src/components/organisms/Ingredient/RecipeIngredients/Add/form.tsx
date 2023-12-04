import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { AutoComplete, Button, Dropdown, FieldContainer, Number } from '../../../../index'
import { INGREDIENT_UNITS } from '../../../../../constants'
import { useGetIngredientsQuery } from '../../../../../redux/reducers/ingredients/ingredients'

type FormProps = {
  handleSubmit: any
  onSubmit: any
  setValue: any
  setRef: any
  register: any
  unit: any
  setUnit: any
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  onSubmit,
  setValue,
  setRef,
  register,
  unit,
  setUnit,
}): ReactElement => {
  const { data: ingredients, isLoading } = useGetIngredientsQuery()
  const [options, setOptions] = useState<Option[]>()

  useEffect(() => {
    if (ingredients && ingredients.length) {
      setOptions(
        ingredients.map((ingredient: Ingredient): Option => {
          return {
            id: ingredient.id,
            disabled: false,
            value: ingredient.id ? ingredient.id.toString() : '',
            label: ingredient.name ? ingredient.name : '',
          }
        }),
      )
    }
  }, [ingredients])

  if (!options) {
    return <p>Loading...</p>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-end mb-4">
      <AutoComplete
        labelText="Ingredient"
        name="ingredient"
        options={options}
        handleOnChange={(option: Option | null): void => {
          if (option && !option.id) {
            setValue('name', option.value)
          }
          if (option && option.value) {
            setValue('id', option.id)
          }
        }}
        setRef={setRef}
        errors={{ message: '', type: '' }}
        isCreatable={true}
        classes="mr-4"
        placeholder="Pick a new ingredient"
      />

      <Number
        name="amount"
        label="Amount"
        placeholder="Enter the amount of the ingredient"
        validation={{
          required: 'Did you forget to enter the amount?',
          min: {
            value: 1,
            message: 'Minimal 1',
          },
          valueAsNumber: true,
        }}
        register={() => register('amount')}
        classes="mr-4"
        // errors={errors.amount}
      />

      <Dropdown
        name="unit"
        label="Unit"
        defaultValue={unit}
        disabled={false}
        onChange={(changedUnit: ChangeEvent<HTMLInputElement>): void => {
          setUnit(changedUnit.target.value)
        }}
        validation={{
          required: 'Did you forget to fill in the unit of your ingredient?',
        }}
        register={() => register('unit')}
        options={INGREDIENT_UNITS}
        classes="mr-4"
        // errors={errors.unit}
      />

      <Button type="submit" label="Add" />
    </form>
  )
}

export default Form
