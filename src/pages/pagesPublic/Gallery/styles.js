import styled from 'styled-components';

export const Album = styled.div`
    text-align: center;
    h2{
        font-size: 20px;
        color: ${({ theme }) => theme.colors.gray[900]};
        margin: 32px 0 16px 0;
    }
`;

export const EmptyGalery = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;

    img{
        width: 200px;
        margin-bottom: 16px;
    }
    span{
        font-size: 18px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};
        text-align: center;
    }
`;
