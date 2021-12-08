import styled from 'styled-components';

const FieldRowStyle = styled.div`
    width: 200px;
`;    

const LabelStyle = styled.label`
    color: black;
`;

const InputStyle = styled.input`
    color: black;
    border: 1px solid #0d6efd;
    padding: 8px;
    margin-bottom: 16px;
    transition: padding 200ms ease-in-out;
    width: auto;

    &:focus {
     padding-left: 16px;
    }
`;

const Textfield = ({
    name = "",
    type = "",
    label = "",
    placeholder = "",
    register,
    validation
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
        </FieldRowStyle>
    )
}

export default Textfield;