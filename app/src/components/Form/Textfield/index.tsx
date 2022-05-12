import { FieldRowStyle, LabelStyle, InputStyle } from './styled'

import { ErrorMessage } from '../../index'

interface TextFieldProps {
  name: string
  type: string
  label: string
  placeholder: string
  defaultValue?: string
  register: Function
  validation: string | object
  errors: string | boolean
}

const Textfield = ({
  name = '',
  type = '',
  label = '',
  placeholder = '',
  defaultValue = '',
  register,
  validation,
  errors,
}: TextFieldProps) => {
  return (
    <FieldRowStyle>
      <LabelStyle htmlFor={name}>{label}</LabelStyle>

      <InputStyle
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        {...register(name, validation)}
        placeholder={placeholder}
      />
      {errors && <ErrorMessage message={errors}></ErrorMessage>}
    </FieldRowStyle>
  )
}

export default Textfield
