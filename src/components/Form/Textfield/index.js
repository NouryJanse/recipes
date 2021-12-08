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