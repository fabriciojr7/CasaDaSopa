import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 450px;
    margin: auto;
    padding: 16px;

    span{
        padding-left: 8px;
        color: ${({ theme }) => theme.colors.danger.main};
        font-size: 18px;
        font-weight: bold;
    }
`;
