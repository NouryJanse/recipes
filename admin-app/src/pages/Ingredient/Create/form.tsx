import React, { ReactElement } from 'react'
import { Button, FieldContainer, Textfield, Toggle } from '../../../components'
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

type FormProps = {
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
    onSubmit: (data: object) => Promise<void>
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    handleToggle: () => void
    toggle: boolean
    saveAndAddAnother: () => Promise<void>
}

const Form: React.FC<FormProps> = ({
    handleSubmit,
    onSubmit,
    register,
    errors,
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
