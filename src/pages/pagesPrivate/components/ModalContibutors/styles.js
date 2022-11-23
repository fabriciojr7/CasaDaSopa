import styled from 'styled-components';

export const Container = styled.div`

`;

export const InputSearch = styled.div`
    margin-top: 40px;
    width: 100%;
    max-width: 600px;
    input{
        width: 100%;
        background: #FFF;
        border: none;
        border-radius: 25px;
        height: 50px;
        box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
        outline: none;
        padding: 0 16px;

        &::placeholder{
            color: #bcbcbc;
        }
    }
`;

export const CheckBox = styled.input`
    height: 18px;
    width: 18px;
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: 2px;
    cursor: pointer;
`;

export const TableContent = styled.div`
    height: 340px;
    overflow: auto;
    margin-top: 16px;

    td{
        svg{
            font-size: 18px;
            cursor: pointer;
            color: ${({ theme }) => theme.colors.primary.main};

            &.active{
                color: red;
            }
        }
    }
`;
