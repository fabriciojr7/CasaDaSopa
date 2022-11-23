import styled from 'styled-components';

export const Container = styled.div`
    padding: 16px;
`;

export const Group = styled.div`
    display: flex;
    gap: 16px;
    border-radius: 4px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 16px;
    background: ${({ theme }) => theme.colors.primary.lighter};

    &+&{
        margin-top: 16px;
    }


    .group-information{
        flex: 2;

        h2{
            font-size: 20px;
            color: ${({ theme }) => theme.colors.gray[900]};
        }
        p{
            color: ${({ theme }) => theme.colors.gray[600]};
            line-height: 24px;
            text-align: justify;
            letter-spacing: 1.2px;

            &:last-child {
                color: ${({ theme }) => theme.colors.primary.main};
            }
        }
    }

    .group-photo{
        width: 300px;
        height: 200px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        border-radius: 4px;

        img{
            width: inherit;
            height: inherit;
            border-radius: 4px;
        }
    }

    @media only screen and (max-width: 768px){
        align-items: center;
        flex-direction: column;

        .group-information{
            p{
                margin: 8px 0;
            }

        }
    }
`;
