import styled from 'styled-components';

export const Container = styled.main`
    width: 100%;
    padding: 48px 0;
    background: ${({ theme, bg }) => (bg ? theme.colors.primary.lighter : '')};

`;

export const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: auto;
`;
