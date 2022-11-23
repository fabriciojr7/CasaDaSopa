import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  h1{
    color: #222;
    font-size: 24px;
    font-weight: bold;
  }
  a{
    width: 100px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.primary.main};
    transition: color 0.2s ease-in;
    position: absolute;
    left: 0;

    .ico{
      margin-right: 8px;
    }
  }
  a:hover{
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  @media only screen and (max-width: 520px){
    justify-content: space-evenly;
    a{
      width: auto;
      padding: 8px;
      span{
        display: none;
      }
      .ico{
        font-size: 20px;
      }
    }

    h1{
      font-size: 22px;
    }
  }
`;
