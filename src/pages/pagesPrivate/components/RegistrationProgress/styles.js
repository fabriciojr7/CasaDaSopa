import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 24px 0;
`;

export const StatusBar = styled.ul`
    display: flex;
    >li{
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    >li .top-bar{
        margin: 0 80px;
    }
    >li .text{
        font-size: 14px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary.main};
    }
`;

export const Progress = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gray[100]};
    color: #222;
    margin-bottom: 14px;
    display: grid;
    place-items: center;
    position: relative;

    &::after{
        content: '';
        position: absolute;
        width: 110px;
        height: 5px;
        background: ${({ theme }) => theme.colors.gray[100]};
        right: 50px;
    }
    &.one::after{
        width: 0;
        height: 0;
    }
    >span{
        color: ${({ theme }) => theme.colors.primary.main};
        font-size: 24px;
        font-weight: bold;
    }
    .uil {
        display: none;
    }

    &.active{
        background: ${({ theme }) => theme.colors.primary.main};
        span{
            color: #fff;
        }

    }
    &.active::after{
        background: ${({ theme }) => theme.colors.primary.main};
    }
`;
