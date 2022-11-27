import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;

    .container-img{
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;

        .area-img{
            width: 200px;
            height: 150px;
            background: ${({ theme }) => theme.colors.primary.main};
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;


            .icon-remove{
                position: absolute;
                font-size: 24px;
                color: #fff;
                display: none;
            }

            &:hover{
                cursor: pointer;
                .icon-remove{
                    display: block;
                    z-index: 10;
                }

                img{
                    opacity: 0.4;
                }
            }

            img{
                width: inherit;
                height: inherit;
            }
        }

    }
`;
