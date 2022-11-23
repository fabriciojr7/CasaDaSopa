import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    margin-top: 16px;
    display: flex;
    align-items: center;
    .ico{
        width: 20%;
        color: ${({ theme }) => theme.colors.danger.main};
        font-size: 80px;
    }
    .details{
        flex: 1;
        margin-left: 24px;
        strong{
            font-size: 22px;
            color: ${({ theme }) => theme.colors.danger.main};
            display: block;
            margin-bottom: 8px;
        }
    }
`;
