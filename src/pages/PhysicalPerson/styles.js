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

    p {
        color: ${props => props.theme.palette.description.secondary.light};
    }
`);

export const ContainerPhysicalPersonCard = withTheme(styled.div`
    padding: 25px 20px;
    width: 100%;
    background-color: ${props => props.theme.palette.background.primary.main};
    border-radius: 12px;

    & + div {
        margin-top: 16px;
    }

    p {
        line-height: 21px;
    }

    .item-container-name {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media(max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
        }

        h2 {
            margin-right: 16px;
        }

        svg {
            font-size: 18px;
        }

        a:hover {
            color: ${props => props.theme.palette.text.secondary};
        }
    }

    .item-flex {
        display: flex;
        align-items: center;
    }

    .item-status {
        background-color: ${props => props.theme.palette.description.secondary.light};
        padding: 6px 12px;
        border-radius: 24px;
        width: fit-content;

        p {
            color: ${props => props.theme.palette.description.primary.main};
        }
    }
`);
