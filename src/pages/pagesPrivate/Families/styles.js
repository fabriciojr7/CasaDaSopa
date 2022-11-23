import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Search = styled.div`
    width: 100%;
    margin-top: 16px;
`;

export const Content = styled.div`
    width: 100%;
`;

export const TableContent = styled.div`
    .solicitacao{
        margin-left: 16px;
        font-size: 16px;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.primary.main};

        &:hover{
            color: ${({ theme }) => theme.colors.primary.light};
        }
        &:active{
            color: ${({ theme }) => theme.colors.primary.dark};
        }
    }
`;
