import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;

    .filter{
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.colors.gray[600]};
        font-weight: bold;

        p{
            margin-right: 8px;
        }

        input{
            margin: 0 8px 0 16px;
            cursor: pointer;
            color: aqua;
        }
    }
`;

export const Content = styled.div`
    width: 100%;
    margin-top: 16px;
    border-top: 2px solid ${({ theme }) => theme.colors.gray[100]};
    padding-top: 8px;
`;

export const Search = styled.div`
    width: 100%;
    margin: 16px 0;
`;
