import { useEffect, useState, useRef, ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'

import { Loader, PageTitle } from '../../../components'
import Form from './form'
import { useGetIngredientQuery, useUpdateIngredientMutation } from '../../../redux/reducers/ingredients/ingredients'

const EditIngredient: React.FC = (): ReactElement => {
  const params = useParams()
  const formRef = useRef()

  const [btnClasses, setBtnClasses] = useState('mb-10')
  const [unit, setUnit] = useState<string>('')
  const [ingredientName, setIngredientName] = useState<string>('')

  const [id, setId] = useState<number>(-1)
  const [skip, setSkip] = useState<boolean>(true)
  const { data: ingredient, isLoading } = useGetIngredientQuery(id, { skip })
  const [updateIngredient] = useUpdateIngredientMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm()

  useEffect(() => {
    if (params.ingredientId !== undefined) {
      setId(Number.parseInt(params.ingredientId, 10))
      setSkip(false)
    }
  }, [params.ingredientId])

  useEffect(() => {
    if (isDirty) setBtnClasses('font-bold mb-10')
    if (ingredient?.name) setIngredientName(ingredient.name)

    if (ingredient) {
      setUnit(ingredient.unit)
    }
  }, [ingredient, ingredient, isDirty])

  const dispatchEdit = async (data: Ingredient, editedIngredient: Ingredient): Promise<boolean> => {
    if (!editedIngredient.id || !data.name) return false

    await updateIngredient({
      ...editedIngredient,
      ...data,
      published: data.published !== undefined ? data.published : ingredient?.published,
      // @ts-ignore:next-line
      calorieCount: Number.parseInt(editedIngredient.calorieCount, 10),
    })
    return true
  }

  // for now this any is allowed, otherwise the whole form needs to be refactored for typing
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSave = async (formData: any): Promise<void> => {
    if (ingredient) dispatchEdit(formData, ingredient)
  }

  const handleToggle = (toggle): void => {
    setValue('published', toggle)
  }

  const debouncedSubmit = useRef(
    debounce(async (data, currentIngredient, func) => {
      func(data, currentIngredient)
    }, 350),
  ).current

  useEffect(() => {
    const subscription = watch(async (data) => {
      await setIngredientName(data.name)
      debouncedSubmit(data, ingredient, dispatchEdit)
    })
    return (): void => subscription.unsubscribe()
  }, [watch, ingredient, debouncedSubmit])

  // Should be styled and moved into a component in the Ingredient subfolder
  if (!ingredient) return <p>Error, no ingredient found or still loading the ingredient from the server.</p>

  return (
    <div className="pt-7">
      <div className="flex items-center">
        <PageTitle text={`Editing ${ingredientName}`} />
        {isLoading && <Loader />}
      </div>

      <Form
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        // unit={unit}
        // setUnit={setUnit}
        // setValue={setValue}
        handleToggle={handleToggle}
        onSave={onSave}
        formRef={formRef}
        ingredient={ingredient}
        btnClasses={btnClasses}
      />
    </div>
  )
}

export default EditIngredient
