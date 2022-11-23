import styled from 'styled-components';

export const Container = styled.div`
    .photos-area{
        display: flex;
        flex-wrap: wrap;
        gap: 32px;
        justify-content: center;
    }

    .section-teatro{
        margin-top: 24px;

        p{
            text-align: justify;
            letter-spacing: 1.2px;
            line-height: 24px;
            margin-bottom: 16px;
        }
    }

    .section-requests{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .enfase{
            font-weight: bold;
            font-size: 20px;
            color: ${({ theme }) => theme.colors.primary.main};
        }
        p{
            text-align: justify;
            letter-spacing: 1.2px;
            line-height: 24px;
            margin-bottom: 16px;
        }

        button{
            margin-top: 24px;
        }
    }

    @media only screen and (max-width: 768px){
        .section-requests, .section-teatro{
            padding: 0 16px;
        }
    }


`;

export const ContentSection = styled.div`
    display: flex;
    flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
    justify-content: center;

    @media only screen and (max-width: 768px){
        flex-direction: column;
        align-items: center;
        padding: 0 16px;

        img{
            margin-top: 32px;
        }
    }
`;

export const Text = styled.div`
    width: 100%;
    max-width: 500px;
    text-align: justify;
    letter-spacing: 1.2px;
    p{
        line-height: 24px;
    }
    margin: 0 30px 30px 30px;

    @media only screen and (max-width: 768px){
        margin: auto;
    }
`;

export const Photo = styled.div`
    width: 220px;

    img{
        width: inherit;
        height: 250px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    @media only screen and (max-width: 768px){
        width: 300px;
    }
`;
