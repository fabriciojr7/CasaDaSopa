import styled from 'styled-components';

export const Container = styled.div`

`;

export const ContainerContributors = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    border-top: 2px solid ${({ theme }) => theme.colors.gray[100]};
    padding-top: 16px;
`;

export const TableContent = styled.div`
    margin-top: 24px;
`;

export const HeaderContributors = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1{
        font-size: 20px;
        color: ${({ theme }) => theme.colors.gray[900]};
    }
`;
