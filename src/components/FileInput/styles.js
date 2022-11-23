import styled from 'styled-components';

export const File = styled.label`
    .picture-input{
        display: none;
    }

    .picture-image{
        width: 100%;
        height: 300px;
        background: ${({ theme }) => theme.colors.primary.lighter};
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.colors.primary.dark};
        border: 2px dashed currentColor;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s ease-in-out;

        &:hover{
            background: ${({ theme }) => theme.colors.primary.light};
        }

        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            svg{
                margin-bottom: 8px;
            }
        }
    }

    .picture-img{
        width: 100%;
        height: 100%;
    }
`;
