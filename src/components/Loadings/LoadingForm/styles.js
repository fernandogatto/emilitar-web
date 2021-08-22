import styled from 'styled-components';

import {withTheme} from '@material-ui/core/styles';

export const Container = withTheme(styled.div`
    .container-box {
        display: flex;

        @media(max-width: 768px) {
            flex-direction: column;
        }

        .item-box {
            flex: 1;
            width: 100%;

            &:nth-child(1) {
                padding-right: 8px;
            }

            &:nth-child(2) {
                padding-left: 8px;
            }

            @media(max-width: 768px) {
                &:nth-child(1) {
                    padding-right: 0;
                    padding-bottom: 8px;
                }

                &:nth-child(2) {
                    padding-left: 0;
                    padding-top: 8px;
                }
            }
        }

        .input {
            width: 100%;

            & + .input {
                margin-top: 16px;
            }

            .skeleton {
                width: 100%;
                height: 56px;
            }
        }

        .grid-button {
            display: flex;
            justify-content: flex-end;

            .skeleton {
                width: 200px;
                height: 42px;
            }
        }
    }
`);
