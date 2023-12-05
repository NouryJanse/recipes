import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { Number, Dropdown, Icon, AutoComplete } from '../../../..'
import {
  useDeleteLinkedIngredientMutation,
  useGetIngredientsQuery,
} from '../../../../../redux/reducers/ingredients/ingredients'
import { INGREDIENT_UNITS } from '../../../../../constants'
import { BsTrash2 } from 'react-icons/bs'
import { useGetRecipeQuery } from '../../../../../redux/reducers/recipes/recipes'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

type FormProps = {
  updateIngredient: any
  ingredient: RecipeIngredient
  recipeId: number
}

type LocalUnit = {
  id: number
  unit: string | undefined
}

const Form: React.FC<FormProps> = ({ updateIngredient, ingredient, recipeId }): ReactElement => {
  const { data: ingredients } = useGetIngredientsQuery()
  const [deleteLinkedIngredient, {}] = useDeleteLinkedIngredientMutation()
  const { refetch } = useGetRecipeQuery(recipeId)
  const [options, setOptions] = useState<Option[]>()
  const [unit, setUnit] = useState<LocalUnit>({ id: ingredient.id, unit: ingredient.unit })
  const [ref, setRef] = useState<StateManagedSelect>()

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

  const onDeleteIngredient = async (): Promise<void> => {
    // @ts-ignore:next-line
    await deleteLinkedIngredient(ingredient.id)
    refetch()
  }

  if (!options) return <p>Loading..</p>

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
        defaultValue={getSelectedOption(options, ingredient)}
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

const getSelectedOption = (options, ingredient): Option | undefined => {
  return options.find((o) => {
    return o.label === ingredient.name
  })
}

export default Form
