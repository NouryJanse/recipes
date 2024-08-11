import React, { ChangeEvent, ReactElement } from 'react'
import { Button, Dropdown, FieldContainer, Textarea, Textfield } from '../../../components'
import { RECIPE_COURSE_OPTIONS } from '../../../constants'
import {
    FieldErrors,
    FieldValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form'

type FormProps = {
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    onSubmit: (data: object) => Promise<void>
    course: React.Dispatch<React.SetStateAction<string>>
    setCourse: React.Dispatch<React.SetStateAction<string>>
    setValue: UseFormSetValue<FieldValues>
}

const Form: React.FC<FormProps> = ({
    handleSubmit,
    onSubmit,
    register,
    errors,
    course,
    setCourse,
    setValue,
}): ReactElement => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldContainer>
                <Textfield
                    name="name"
                    type="text"
                    label="Recipe title*"
                    placeholder="Fill in a title"
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
                    disabled={false}
                    onChange={(changedCourse: ChangeEvent<HTMLInputElement>): void => {
                        setCourse(changedCourse.target.value)
                        setValue('course', changedCourse.target.value)
                    }}
                    validation={{
                        required: 'Did you forget to fill in the course of your recipe?',
                        validate: {
                            stillRequired: (value: string) => value !== 'choice',
                        },
                    }}
                    register={register}
                    errors={errors.course}
                    options={RECIPE_COURSE_OPTIONS}
                />
            </FieldContainer>

            <Button type="submit" label="Save recipe" />
        </form>
    )
}

export default Form
