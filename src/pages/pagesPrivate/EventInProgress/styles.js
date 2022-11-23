import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    margin-top: 16px;
    border-top: 2px solid ${({ theme }) => theme.colors.gray[100]};
    padding-top: 8px;
`;

export const NoEvent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        margin-top: 32px;
    }

    p{
        color: ${({ theme }) => theme.colors.gray[200]};
        text-align: center;
        margin-top: 8px;

        strong{
            font-size: 18px;
            color: ${({ theme }) => theme.colors.primary.main};
        }
    }
`;

export const CurrentEvent = styled.div`
    .header-event{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        h2{
            font-size: 20px;
            color: #222;
            font-weight: bold;
        }
    }

    table{
        svg{
            font-size: 20px;
            color: ${({ theme }) => theme.colors.green.main};
        }

        button{
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            background-color: ${({ theme }) => theme.colors.primary.main};
            color: #fff;
            transition: background 0.2s ease-in-out;

            &:hover{
                background-color: ${({ theme }) => theme.colors.primary.light};
            }
        }
    }

`;

export const Search = styled.div`
    width: 100%;
    margin: 16px 0;
`;
