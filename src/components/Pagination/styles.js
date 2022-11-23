import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 8px 0;
  color: ${({ theme }) => theme.colors.gray[600]};

  svg{
    color: ${({ theme }) => theme.colors.primary.dark};
    font-size: 24px;
    cursor: pointer;

    &:first-child{
      margin-right: 8px;
    }
    &:last-child{
      margin-left: 8px;
    }

    &.block{
      color: ${({ theme }) => theme.colors.gray[600]};
    }
  }
`;
