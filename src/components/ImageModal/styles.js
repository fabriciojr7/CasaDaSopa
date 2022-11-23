import styled from 'styled-components';

export const Overlay = styled.div`
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(5px);
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    z-index: 100;

    img{
        width: auto;
        max-width: 100%;
        height: auto;
        max-height: 100%;
        display: block;
        line-height: 0;
        padding: 20px 0 20px;
        margin: 0 auto;
    }

    svg{
       position: fixed;
       top: 10px;
       right: 10px;
       color: #fff;
       font-size: 32px;
       cursor: pointer;
    }
`;
