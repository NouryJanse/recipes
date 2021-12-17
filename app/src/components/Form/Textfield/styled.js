import styled from 'styled-components';

export const FieldRowStyle = styled.div`
    width: 200px;
    margin-bottom: 16px;
`;    

export const LabelStyle = styled.label`
    margin-bottom: 8px;
    color: black;
`;

export const InputStyle = styled.input`
    color: black;
    border: 1px solid #0d6efd;
    padding: 8px;
    transition: padding 200ms ease-in-out;
    width: 99%;

    &:focus {
     padding-left: 16px;
    }
`;

