import React, { ReactElement, useState } from 'react'
import { Button, FieldContainer, Textfield, Toggle } from '../../../components'
import { Link } from 'react-router-dom'
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

type FormProps = {
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    onSave: (formData: any) => Promise<void>
    formRef: React.MutableRefObject<undefined>
    ingredient: Ingredient
    btnClasses: string
    handleToggle: (toggle: boolean) => void
}

const Form: React.FC<FormProps> = ({
    handleSubmit,
    register,
    errors,
    handleToggle,
    onSave,
    formRef,
    ingredient,
    btnClasses,
}): ReactElement => {
    const [toggle, setToggle] = useState<boolean>(ingredient.published)
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

            <FieldContainer>
                <Toggle
                    handleToggle={(): void => {
                        handleToggle(!toggle)
                        setToggle(!toggle)
                    }}
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
