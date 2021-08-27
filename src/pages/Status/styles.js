import styled from 'styled-components';

import { withTheme } from '@material-ui/core/styles';

export const ContainerStatus = withTheme(styled.div`
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

export const ContentStatus = withTheme(styled.div`
    max-width: 1200px;
    width: 100%;
    margin: auto;

    p {
        color: ${props => props.theme.palette.description.secondary.light};
        line-height: 21px;
    }

    .container-grid-area {
        .item-main, .item-sidebar, .item-footer {
            background-color: ${props => props.theme.palette.background.primary.main};
            border-radius: 12px;
            padding: 32px 16px 16px;

            .container-title {
                margin-bottom: 16px;
            }
        }

        .item-main {
            .container-description {
                .item-description + .item-description {
                    margin-top: 16px;
                }
            }
        }

        .item-sidebar {
            .container-description {
                p {
                    display: flex;
                    align-items: center;
                }

                svg {
                    margin-right: 8px;
                }
            }
        }

        .item-footer {
            .container-description {
                .item-description {
                    & + .item-description {
                        margin-top: 16px;
                    }

                    h4 {
                        font-size: 14px;
                    }
                }
            }
        }
    }
`);
