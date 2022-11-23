import styled from 'styled-components';
import iconLogin from '../../../assets/images/iconLogin.png';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background-image: linear-gradient(
        ${({ theme }) => theme.colors.primary.main},
        ${({ theme }) => theme.colors.primary.lighter}
        );
`;

export const Content = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    text-align: center;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    z-index: 1;

    h1{
        font-size: 32px;
        margin: 16px 0;
        letter-spacing: 4px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary.main};
    }
`;

export const ImageLogin = styled.div`
    width: 100%;
    height: 150px;
    background-image: url(${iconLogin});
    background-size: cover;
    background-position: center;
    position: relative;
`;

export const Areabtn = styled.div`
    margin-top: 20px;
    button{
        width: 100%;
    }
`;
