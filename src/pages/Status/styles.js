import styled from 'styled-components';

import { withTheme } from '@material-ui/core/styles';

export const ContainerPoints = withTheme(styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;

    .container-page {
        flex: 1;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 45px 30px;
    }
`);

export const ContentPoints = withTheme(styled.div`
    height: 100%;
    max-width: 1200px;
    width: 100%;
    margin: auto;
`);

export const ContainerSearch = withTheme(styled.div`
    display: flex;

    .input {
        margin-right: 16px;
    }

    .grid-button {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .wrapper {
            position: relative;
            height: 56px;

            button {
                height: 56px;
            }

            .circular-progress {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -12px;
                margin-left: -12px;
            }
        }
    }
`);
