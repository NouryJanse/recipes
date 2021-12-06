import styled from 'styled-components';

const FieldRowStyle = styled.div`
    width: 200px;
    height: 50px;
`;    

const LabelStyle = styled.label`
    color: black;
`;

const InputStyle = styled.input`
    color: red;
    border: 1px solid #F25C54;
    padding: 5px;
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