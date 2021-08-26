import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        -webkit-font-smoothing: antialiased;
        background-color: #F0EFF1;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 700;
        font-family: 'Roboto';
        color: #3D475C;
    }

    a, p, li {
        font-family: 'Roboto';
    }

    a {
        text-decoration: none;
        color: #333;

        &: hover {
            color: #111;
        }
    }

    p {
        white-space: pre-wrap;
    }

    .container-grid-area {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: auto;
        column-gap: 32px;
        row-gap: 32px;
        grid-template-areas:
            "header header"
            "main sidebar"
            "footer sidebar";

        .item-header {
            grid-area: header;
        }

        .item-main {
            grid-area: main;
        }

        .item-sidebar {
            grid-area: sidebar;
            height: fit-content;
        }

        .item-footer {
            grid-area: footer;
        }
    }

    .container-header-page {
        display: flex;
        align-items: center;
        margin-bottom: 32px;

        h1 {
            margin-right: 16px;
            line-height: 48px;
        }
    }

    .container-back-page {
        margin-bottom: 32px;

        h1 {
            margin-top: 16px;
        }
    }

    /* Scrollbar */

    /* Works on Firefox */
    * {
        scrollbar-width: thin;
        scrollbar-color: #C1C1C1 transparent;
    }

    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        width: 6px;
    }

    *::-webkit-scrollbar-track {
        background: transparent;
    }

    *::-webkit-scrollbar-thumb {
        background-color: #CECECE;
        border-radius: 12px;
    }
`;
