import {
    FieldRowStyle,
    LabelStyle,
    InputStyle,
} from './styled';

import { ErrorMessage } from '../../index';

const Textfield = ({
    name = "",
    type = "",
    label = "",
    placeholder = "",
    defaultValue = "",
    register,
    validation,
    errors
}) => {
    return (
        <FieldRowStyle>
            <LabelStyle
            >
                {label}
            </LabelStyle>
    
            <InputStyle
                name={name}
                type={type}
                defaultValue={defaultValue}
                {...register(name, validation)}
                placeholder={placeholder}
            />
            {errors && 
                <ErrorMessage message={errors}>
                </ErrorMessage>
            }            
        </FieldRowStyle>
    )
}

export default Textfield;