import styled, { css } from 'styled-components';

export const Container = styled.div`
    position: relative;
    height: 44px;

    select{
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        font: inherit;
        background: transparent;
        outline: none;
        border: 2px solid ${({ theme }) => theme.colors.gray[500]};
        transition: border-color .2s ease-in-out;

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
    }

    label{
        position: absolute;
        left: 0;
        transform: translate(8px, -13px) scale(.8);
        transform-origin: left;
        background: ${({ theme }) => theme.colors.background};
        padding: 0 8px;

        color: ${({ theme, error }) => (
    error ? theme.colors.danger.main
      : theme.colors.gray[600]
  )};
    }
`;
