import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
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
