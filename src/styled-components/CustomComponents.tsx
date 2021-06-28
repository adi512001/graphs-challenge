import styled from 'styled-components';

export const Label = styled.label`
border: 1px solid #ccc;
display: inline-block;
padding: 6px 12px;
cursor: pointer;
width: 20%;
text-align: center;
`;

export const Button = styled.button`
border-radius: 0;
border: 1px solid #ccc;
cursor: pointer;
`;

export const InputContainer = styled.div`
display: flex;
justify-content: center;
`;

export const ChartsContainer = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
> * {
    display: block;
    margin: 4% 3%;
}
`;