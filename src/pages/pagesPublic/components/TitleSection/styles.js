import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
    width: 100%;

    margin: auto;
    margin-bottom: 24px;
    text-transform: uppercase;
    padding: 0 16px;

    h1{
        color: ${({ theme }) => theme.colors.gray[900]};
        font-size: 24px;
    }
    h2{
        color: ${({ theme }) => theme.colors.primary.dark};
        font-size: 24px;
    }

    .line{
        width: 100px;
        height: 6px;
        background: ${({ theme }) => theme.colors.primary.lighter};
        margin: auto;
        margin-top: 8px;
    }
`;
