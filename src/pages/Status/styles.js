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
    max-width: 1200px;
    width: 100%;
    margin: auto;
`);
