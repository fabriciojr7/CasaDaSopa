import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 2;

  input{
    width: 100%;
    max-width: 500px;
    height: 48px;
    border: none;
    outline: none;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 2px solid ${({ theme }) => theme.colors.gray[200]};
    border-right: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 0 16px;
    font-size: 16px;
    appearance: none;
    transition: border-color 0.2s ease-in;

    &:focus{
        border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const IconSearch = styled.div`
  width: 52px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primary.main};
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: 24px;
`;
