import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            dark: '#0169FA',
            main: '#13B0FC',
            light: '#4FD6FF',
            contrastText: '#FFFFFF',
        },
        background: {
            primary: {
                main: '#FFFFFF',
            },
            secondary: {
                main: '#F0EFF1',
            },
            tertiary: {
                main: '#E8E8E8',
            },
        },
        description: {
            primary: {
                main: '#333',
            },
            secondary: {
                main: '#767676',
                light: '#929FB1',
            },
        },
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                borderRadius: 12,
            },
        },
        MuiButton: {
            root: {
                borderRadius: 12,
            },
        },
    },
});

export default theme;
