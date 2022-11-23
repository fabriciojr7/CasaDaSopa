import styled, { css } from 'styled-components';

export const Container = styled.div`
    position: relative;
    height: 120px;

    textarea{
        width: 100%;
        height: 120px;
        padding: 10px;
        border: none;
        border-radius: 4px;
        font: inherit;
        background: transparent;
        outline: none;
        border: 2px solid ${({ theme }) => theme.colors.gray[500]};
        z-index: 1;
        transition: border-color .2s ease-in-out;
        resize: none;

        &:hover, &:focus{
            border-color: ${({ theme }) => theme.colors.primary.main};
        }
        &:focus ~ label{
            color: ${({ theme, error }) => (
    error ? theme.colors.danger.main
      : theme.colors.primary.main
  )};
        }

        ${({ theme, error }) => error && css`
            color: ${theme.colors.danger.main};
            border-color: ${theme.colors.danger.main} !important;
        `}

        &[disabled]{
            background: ${({ theme }) => theme.colors.gray[100]};
            border-color: ${({ theme }) => theme.colors.gray[200]};
        }
    }

    .area:focus ~ label,
    .area:not(:placeholder-shown).area:not(:focus)~label{
        transform: translate(8px, -13px) scale(.8);
        background: ${({ theme }) => theme.colors.background};
        padding: 0 8px;
        z-index: 0;
    }

    label{
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(10px, 10px);
        transform-origin: left;
        transition: transform .25s;
        z-index: -1;
        color: ${({ theme, error }) => (
    error ? theme.colors.danger.main
      : theme.colors.gray[600]
  )};
    }
`;
