import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Search = styled.div`
    width: 100%;
    margin-top: 16px;
`;

export const Content = styled.div`
    width: 100%;
`;

export const TableContent = styled.div`
    @media (min-width: 700px){
        table{
            thead tr th:nth-child(1){
                text-align: left;
                padding-left: 32px;
            }

            tbody tr td:nth-child(1){
                width:80%;
                text-align: left;
                padding-left: 32px;
            }
            tbody tr td:nth-child(2){
                width:10%;
                text-align: center;
            }
        }
    }
`;
