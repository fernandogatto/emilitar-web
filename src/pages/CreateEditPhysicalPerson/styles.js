import styled, {keyframes} from 'styled-components';

import { withTheme  } from '@material-ui/core/styles';

function bganimation() {
    return keyframes`
	100% {
		background-position: 100% 100%;
	}
  `
};

export const ContainerCreateEditPoints = withTheme(styled.div`
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

export const ContentCreateEditPoints = withTheme(styled.div`
    height: 100%;
    max-width: 1200px;
    width: 100%;
    margin: auto;

    .container-form {
        align-items: center;

        .container-section {
            margin-bottom: 16px;

            h2 {
                margin-bottom: 16px;
            }
        }

        .container-flex {
            display: flex;
            margin-bottom: 16px;

            @media(max-width: 768px) {
                flex-direction: column;
            }

            .item-flex {
                flex: 1;

                &:nth-child(1) {
                    margin-right: 8px;

                    @media(max-width: 768px) {
                        margin-right: 0;
                        margin-bottom: 16px;
                    }
                }

                &:nth-child(2) {
                    margin-left: 8px;

                    @media(max-width: 768px) {
                        margin-left: 0;
                    }
                }
            }
        }

        .input {
            width: 100%;

            & + .input {
                margin-top: 16px;
            }
        }

        .grid-button {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .wrapper {
                position: relative;

                .circular-progress {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top: -12px;
                    margin-left: -12px;
                }
            }
        }
    }
`);

export const SelectedItem = withTheme(styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 2px solid #eee;
    padding: 8px 0;

    &.load-action {
        opacity: 0.5 !important;
        pointer-events: none !important;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image:
            repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 1rem,
            #ccc 1rem,
            #ccc 2rem
        );
        background-size: 200% 200%;
        animation: ${bganimation} 15s linear infinite;
    }

    .item-title {
        display: flex;
        align-items: center;
    }

    button {
        min-width: 40px;

        svg {
            color: ${props => props.theme.palette.primary.main};
            height: 100%;

            display: flex;
            align-items: center;
        }
    }
`);
