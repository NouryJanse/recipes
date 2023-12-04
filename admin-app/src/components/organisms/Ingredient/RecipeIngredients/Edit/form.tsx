import React, { ReactElement, useEffect, useState } from 'react'
import AutoComplete from '../../../../molecules/Form/AutoComplete'
import Number from '../../../../molecules/Form/Number'
import Dropdown from '../../../../molecules/Form/Dropdown'
import Icon from '../../../../atoms/Icon'
import { BsTrash2 } from 'react-icons/bs'
import { useGetIngredientsQuery } from '../../../../../redux/reducers/ingredients/ingredients'

type FormProps = {}

const Form: React.FC<FormProps> = ({}): ReactElement => {
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

  if (!options) return <p>Loading..</p>

  const option: Option | undefined = options.find((o) => {
    return o.label === ingredient.name
  })

  return (
    <div className="flex flex-row items-end mb-4">
      <AutoComplete
        labelText="Ingredient"
        name="ingredient"
        options={options}
        handleOnChange={(option: Option | null): void => {
          if (option && option.value) {
            updateIngredient('ingredientId', parseInt(option.value), ingredient)
          }
        }}
        defaultValue={option}
        setRef={setRef}
        errors={{ message: '', type: '' }}
        classes="mr-4"
        isCreatable={true}
      />

      <Number
        name="amount"
        label="Amount"
        placeholder=""
        defaultValue={ingredient.amount}
        setValue={(value: number): void => {
          updateIngredient('amount', +value, ingredient)
        }}
        classes="mr-4"
      />

      <Dropdown
        name="unit"
        defaultValue={unit.unit ? unit.unit : ''}
        label="Unit"
        options={INGREDIENT_UNITS}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setUnit({ id: unit.id, unit: e.target.value })
          updateIngredient('unit', e.target.value, ingredient)
        }}
        classes="w-24 mr-4"
      />

      <Icon
        iconElement={
          <BsTrash2
            style={{ color: 'gray', width: '32px', height: '32px', marginBottom: '4px' }}
            onClick={(): Promise<void> => onDeleteIngredient()}
          />
        }
        classes="items-center"
      />
    </div>
  )
}

export default Form
