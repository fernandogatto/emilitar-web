import styled from 'styled-components';

import { withTheme  } from '@material-ui/core/styles';

export const MenuContainer = withTheme(styled.div`
    height: 100vh;
    width: 250px;
    background-color: ${props => props.theme.palette.background.tertiary.main};
    padding: 20px 0 35px;

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        height: 70px;
    }

    nav {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        width: 100%;

        a {
            padding: 12px;
            color: ${props => props.theme.palette.description.secondary.main};
            transition: .2s ease all;
            display: flex;
            align-items: center;
            text-transform: uppercase;
            font-size: 14px;

            &:hover {
                color: ${props => props.theme.palette.primary.main};
            }

            & + a {
                margin-top: 4px;
            }

            &.active {
                color: ${props => props.theme.palette.primary.main};
                border-right: 3px solid ${props => props.theme.palette.primary.main};
            }

            svg {
                margin-right: 8px;
            }
        }
    }

    .logoff {
        margin-top: auto;
        margin-right: auto;
        padding-left: 16px;
        justify-content: flex-start;
        font-size: 14px;
    }
`);
