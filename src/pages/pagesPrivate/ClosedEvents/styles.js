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

    tbody tr{
        cursor: pointer;

        &:hover{
            background: ${({ theme }) => theme.colors.primary.lighter};
        }
    }
`;
