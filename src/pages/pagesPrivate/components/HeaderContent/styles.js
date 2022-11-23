import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: ${({ justfyContent }) => justfyContent};
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
    padding-bottom: 16px;
    padding-top: 16px;

    strong{
        color: #222;
        font-size: 22px;
    }

    .actions{
        display: flex;

        a{
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 8px;
            font-size: 32px;
            color: ${({ theme }) => theme.colors.primary.main};
            border: 2px solid ${({ theme }) => theme.colors.primary.main};
            border-radius: 50%;
            transition: all 0.2s ease-in;

            &:hover{
                background: ${({ theme }) => theme.colors.primary.main};
                color: #FFF;
            }
        }

        button{
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            border-radius: 50%;
        }
    }



    @media only screen and (max-width: 520px){
        strong{
            font-size: 18px;
        }

        .actions{
            a{
                width: 48px;
                height: 48px;
            }
            button{
                width: 48px;
                height: 48px;

                .pdf {
                    font-size: 52px;
                }
            }

        }
    }
`;
