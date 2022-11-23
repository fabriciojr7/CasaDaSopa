import styled from 'styled-components';

export const Content = styled.main`

`;

export const Text = styled.div`
    width: 100%;
    text-align: justify;
    letter-spacing: 1.2px;
    padding: 0 16px;

    p{
        line-height: 24px;
    }
`;

export const TextForm = styled.div`
    text-align: center;
    margin: 32px 0 24px 0;

    h2{
        font-size: 20px;
        color: ${({ theme }) => theme.colors.primary.main};
    }
`;

export const Form = styled.form`
    width: 100%;
    max-width: 500px;
    margin: auto;
    padding: 0 16px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 32px;

    .cancel{
        background: transparent;
        border: none;
        font-size: 16px;
        margin-right: 24px;
        color: ${({ theme }) => theme.colors.gray[200]};


        &:disabled{
            cursor: not-allowed;
        }
    }
`;
