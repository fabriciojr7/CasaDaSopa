import styled from 'styled-components';

export const Album = styled.div`
    text-align: center;
    h2{
        font-size: 20px;
        color: ${({ theme }) => theme.colors.gray[900]};
        margin: 32px 0 16px 0;
    }
`;
