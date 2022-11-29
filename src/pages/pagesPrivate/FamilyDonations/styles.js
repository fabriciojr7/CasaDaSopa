import styled from 'styled-components';

export const Container = styled.div``;

export const Search = styled.div`
    margin: auto;
    margin-top: 40px;
    width: 100%;
    max-width: 600px;
`;

export const Content = styled.div`
    margin-top: 32px;
    width: 100%;
`;

export const TableContent = styled.div`
    margin-top: 24px;

    .solicitacao{
        margin-left: 16px;
        font-size: 16px;
        cursor: pointer;
    }
`;

export const TabContainer = styled.div`
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    align-items: center;
`;

export const TabProdHead = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    background: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 8px;
    border: 3px solid ${({ theme }) => theme.colors.gray[100]};

    @media only screen and (max-width: 575px){
        margin-bottom: 24px;
    }
`;

export const Tab = styled.div`
    flex: 1;
    padding: 8px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[500]};
    cursor: pointer;

    h4{
        font-size: 18px;
    }

    &.active {
        color: ${({ theme }) => theme.colors.primary.dark};
        background: ${({ theme }) => theme.colors.primary.lighter};
        border: 3px solid ${({ theme }) => theme.colors.primary.main};
        border-radius: 8px;
        transform: scale(1.1);
    }

    @media only screen and (max-width: 575px){
        h4{
            font-size: 16px;
        }
    }
`;

export const TabProdBody = styled.div`
    width: 100%;
    position: relative;
    padding-bottom: 16px;

    @media only screen and (min-width: 575px){
        padding: 24px;
        margin: 0 30px 10px 30px;
    }
`;

export const TabContent = styled.div`
    display: none;
    &.active{
        display: block;
    }
`;
