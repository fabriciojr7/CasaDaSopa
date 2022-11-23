import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
`;

export const Card = styled.div`
    width: 100%;
    max-width: 600px;
    background: ${({ theme }) => theme.colors.primary.lighter};
    border-radius: 4px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    & + & {
        margin-top: 16px;
    }

    .card-description{
        padding: 16px;
        p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            color: ${({ theme }) => theme.colors.gray[600]};
        }
    }

    .card-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px 8px 16px;
        background: ${({ theme }) => theme.colors.primary.main};
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        color: #fff;
        text-transform: uppercase;
        svg{
            font-size: 24px;
        }
    }

    &:hover{
        transform: scale(1.02);

        .card-header{
            background: ${({ theme }) => theme.colors.primary.dark};
            color: ${({ theme }) => theme.colors.primary.lighter};
        }
    }
`;
