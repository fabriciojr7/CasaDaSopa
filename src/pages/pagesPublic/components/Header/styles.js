import styled from 'styled-components';

export const StyledHeader = styled.header`
    background: ${({ theme }) => theme.colors.primary.main};

    .login-buttom button{
        border: none;
        background: ${({ theme }) => theme.colors.primary.dark};
        padding: 10px 16px;
        border-radius: 4px;

        color: #fff;
        font-weight: bold;
        transition: background 0.2s ease-in-out;

        &:hover{
            background: ${({ theme }) => theme.colors.primary.light};
        }
    }

    a{
        color: #fff;
    }

    .mobile-icon button{
        background: transparent;
        border: none;
        cursor: pointer;
    }

    @media screen and (max-width: 780px){
        .login-buttom{
            display: none;
        }
    }
`;

export const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 6rem;

    .mobile-icon{
        display: none;
    }

    @media screen and (max-width: 780px){
        padding: 1.5rem 4rem;

        .mobile-icon{
            display: block;
        }
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const List = styled.div`
    display: flex;
    align-items: center;



    ul{
        display: flex;
        justify-content: center;

        li{
            margin: 0 16px;

            a{
                font-weight: bold;
                letter-spacing: 2px;
                &:hover{
                    color: ${({ theme }) => theme.colors.primary.lighter};
                }
            }
        }
    }

    @media screen and (max-width: 780px){
        ul li{
            display: none;
        }
    }
`;

export const ListMenu = styled.div`

    display: none;

    @media screen and (max-width: 780px){
        display: flex;
        flex-direction: column;
        text-align: center;
        padding-bottom: 1rem;

        ul li{
            display: ${({ menuOpen }) => (menuOpen ? 'block' : 'none')};
            padding-top: 1.2rem;

            a{
                font-weight: bold;
                letter-spacing: 2px;
            }
        }

        .login-buttom{
            display: ${({ menuOpen }) => (menuOpen ? 'block' : 'none')};
            padding: 1rem 2rem;

            button{
                width: 100%;
            }
        }
    }

`;
