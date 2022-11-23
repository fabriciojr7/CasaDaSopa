import styled from 'styled-components';
import bg from '../../../../assets/images/banner.jpg';

export const BannerContainer = styled.div`
    background-image: url(${bg});
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;
    &::after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: #000;
        opacity: .6;
        z-index: -1;
    }
`;

export const Container = styled.div`
    min-height: 80vh;
    width: 100%;
    max-width: 1000px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    h1{
        color: #FFF;
        font-size: 48px;
        span{
            font-size: 36px;
        }
    }

    @media only screen and (max-width: 480px){
        min-height: 60vh;
        h1{
        color: #FFF;
        font-size: 32px;
        span{
            font-size: 24px;
        }
    }
    }
`;
