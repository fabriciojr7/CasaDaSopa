import styled from 'styled-components';

export const Form = styled.form`
    width: 100%;
    max-width: 500px;
    margin: auto;

    @media only screen and (max-width: 480px){
        padding: 0 16px;
    }
`;

export const Box = styled.div`
    width: 100%;
    max-width: 400px;
    margin: auto;
    margin-bottom: 18px;
`;

export const ButtonContainer = styled.div`
    margin-top: 24px;
    button{
        width: 100%;
    }
`;

export const Address = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    text-align: center;

    h3{
        color: ${({ theme }) => theme.colors.primary.light};
        margin-bottom: 16px;
    }

    img{
        width: 100%;
    }

    @media only screen and (max-width: 480px){
        img{
            height: 140px;
        }
    }
`;
