import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;

    h1{
        font-size: 28px;
        color: #222;
        font-weight: bold;

    }
    ul{
        list-style: none;
        position: absolute;
        width: 100vw;
        height: 100vh;
        left: 100%;
        top: 0;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1;
        overflow-x: hidden;
        transition: .5s ease-in display;
    }

    &.active{
        ul{
            display: flex;
            left: 0%;
        }
    }

    @media only screen and (max-width: 800px){
        justify-content: space-between;
    }
`;

export const Hamburguer = styled.div`
    width: 60px;
    height: 60px;
    display: inline-block;
    border: 3px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    cursor: pointer;
    transform: scale(.8);

    &.hamb.active{
        border: 3px solid  #FFF;
    }

    @media only screen and (min-width: 800px){
        display: none;
    }
`;

export const BarHamburguer = styled.div`
    height: 3px;
    width: 30px;
    position: relative;
    background: ${({ theme }) => theme.colors.primary.main};
    z-index: -1;
    &::after, &::before{
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        background: ${({ theme }) => theme.colors.primary.main};
        transition: .3s ease;
        transition-property: top, bottom;
    }
    &::after{
        top: 8px;
    }
    &::before{
        bottom: 8px;
    }
    .hamb.active &::after{
        background: #fff;
        top: 0;
    }
    .hamb.active  &::before{
        background: #fff;
        bottom: 0;
    }
`;
