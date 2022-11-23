import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Content = styled.div`
    min-height: calc(100vh - 112px);
`;

export const Footer = styled.footer`
    padding: 4px;
    font-size: 14px;
    text-align: center;
    background: ${({ theme }) => theme.colors.primary.main};
    color: #fff;
    small{
        display: block;
    }
`;
