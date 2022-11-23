import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;


    .card{
        width: 300px;
        text-align: center;

        h4{
            color: ${({ theme }) => theme.colors.gray[600]};
            letter-spacing: 1.2px;
        }


    }

    .card-header{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border-bottom: 1px solid ${({ theme }) => theme.colors.gray[500]};

        padding: 16px 0;
        margin-bottom: 16px;
    }

    .img-area{
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 16px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.primary.lighter};
        margin-bottom: 16px;

        img{
            width: 80px;
        }
    }


    @media only screen and (max-width: 768px){
        flex-direction: column;

        .card + .card {
            margin-top: 32px;
        }
    }
`;
