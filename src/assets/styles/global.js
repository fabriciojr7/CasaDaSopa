import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;

    }
    body{
        font-size: 16px;
        background: ${({ theme }) => theme.colors.background};
        overflow-x: hidden;
    }
    a{
        text-decoration: none;
    }
    ul {
        list-style: none;
    }
    p{
        font-size: 16px;
        line-height: 24px;
    }
    button{
        cursor: pointer;
    }
`;
