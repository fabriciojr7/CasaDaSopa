import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`;

export const HeaderAlbumPhotos = styled.header`
    border-top: 2px solid ${({ theme }) => theme.colors.gray[100]};
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
        font-size: 20px;
        color: ${({ theme }) => theme.colors.gray[600]};
        margin-bottom: 16px;
    }
`;
