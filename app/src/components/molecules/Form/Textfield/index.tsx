import React, { ReactElement, useState } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { FieldRowStyle, LabelStyle, InputStyle } from './styled'

import { ErrorMessage } from '../../../index'

type TextFieldProps = {
  name: string
  type: string
  label: string
  placeholder: string
  register?: UseFormRegister<FieldValues>
  validation?: object
  errors?: errorObject
  defaultValue?: string
  setValue?: (value: string | number) => void
  defaultIsNotEditing?: boolean
  labelClasses?: string
}

const Textfield: React.FC<TextFieldProps> = ({
  name = '',
  type = '',
  label = '',
  placeholder = '',
  defaultValue,
  register,
  validation,
  errors,
  setValue,
  defaultIsNotEditing,
  labelClasses = '',
}): ReactElement => {
  const [editingValue, setEditingValue] = useState(defaultValue)
  const [isEditing, setIsEditing] = useState<boolean>(
    typeof defaultIsNotEditing === 'boolean' ? !defaultIsNotEditing : true,
  )

  const onChange = (event): void => setEditingValue(event.target.value)
  const onKeyDown = (event): void => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur()
    }
  }
  const onBlur = (event): void => {
    if (defaultIsNotEditing === true) {
      setIsEditing(false)
    }
    if (event.target.value.trim() === '') {
      setEditingValue(event.target.value)
    } else if (setValue) {
      setValue(event.target.value)
    }
  }
  const onFocus = (): void => {
    if (defaultIsNotEditing === true) {
      setIsEditing(true)
    }
  }

  return (
    <FieldRowStyle>
      <LabelStyle htmlFor={name} className={labelClasses}>
        {label}
      </LabelStyle>

      {register && validation ? (
        <InputStyle
          {...register(name, validation)}
          id={name}
          name={name}
          type={type}
          defaultValue={editingValue}
          placeholder={placeholder}
          $isEditing={isEditing}
        />
      ) : (
        <InputStyle
          id={name}
          name={name}
          type={type}
          defaultValue={editingValue}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          $isEditing={isEditing}
        />
      )}

      {errors && <ErrorMessage errorObject={errors} />}
    </FieldRowStyle>
  )
}

Textfield.defaultProps = {
  defaultValue: '',
}

export default Textfield
