import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
`;

export const TableContent = styled.div`
    margin-top: 24px;
`;

export const HeaderDependent = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom:  20px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
`;
