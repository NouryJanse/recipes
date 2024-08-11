import React, { ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { FieldRowStyle, LabelStyle, InputStyle } from './styled'

import { ErrorMessage } from '../../../index'

type NumberProps = {
    name: string
    label: string
    placeholder: string
    register?: UseFormRegister<FieldValues>
    validation?: object
    errors?: errorObject
    defaultValue?: number
    setValue?: (value: number) => void
    classes?: string
}

const Number: React.FC<NumberProps> = ({
    name = '',
    label = '',
    placeholder = '',
    defaultValue = '',
    register,
    validation,
    errors,
    setValue,
    classes = '',
}): ReactElement => {
    const onChange = (event): void => {
        if (setValue) setValue(event.target.value)
    }

    const onKeyDown = (event): void => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            event.target.blur()
        }
    }

    const onBlur = (event): void => {
        if (event.target.value.trim() === '') {
            // setEditingValue(event.target.value)
        } else if (setValue) {
            setValue(event.target.value)
        }
    }

    return (
        <FieldRowStyle>
            <LabelStyle htmlFor={name}>{label}</LabelStyle>

            {register && validation ? (
                <InputStyle
                    {...register(name, validation)}
                    id={name}
                    name={name}
                    type="number"
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className={classes}
                />
            ) : (
                <InputStyle
                    id={name}
                    name={name}
                    type="number"
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    className={classes}
                />
            )}

            {errors && <ErrorMessage errorObject={errors} />}
        </FieldRowStyle>
    )
}

export default Number
