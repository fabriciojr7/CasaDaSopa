import styled from 'styled-components';

export const Container = styled.ul`
    height: 100%;
    background: ${({ theme }) => theme.colors.primary.main};
    list-style: none;
    border-radius: 8px;

    a li{
        display: flex;
        align-items: center;
        color: #FFF;
        padding: 10px 0;

        .ico{
            margin: 0 16px 0 8px;
            font-size: 24px;
        }

        &:hover{
            background: ${({ theme }) => theme.colors.primary.light};
        }
    }

    @media only screen and (max-width: 800px){
        border-radius: 0;
        svg{
            display: none;
        }
    }
`;

export const Logo = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 22px;
    font-weight: bold;
    color: #fff;

    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
    margin-bottom: 4px;

    @media only screen and (max-width: 800px){
        display: none;
    }
`;

export const LogoutContent = styled.div`
    li{
        display: flex;
        align-items: center;
        color: #FFF;
        padding: 10px 0;
        cursor: pointer;

        .ico{
            margin: 0 16px 0 8px;
            font-size: 24px;
        }

        &:hover{
            background: ${({ theme }) => theme.colors.primary.light};
        }
    }
`;
