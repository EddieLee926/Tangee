import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
    palette: {
        // primary:{
        //     light: "",
        //     main: "#8bc34a",
        //     dark: "",
        // },
        // secondary:{
        //     main: "#ffa733"
        // }
        primaryOrange: {
            main: '#FFC446',
        },
        hoverOrange: {
            main: '#f5ba3b',
        },
        lightOrange: {
            main: '#FFE6AE',
        },
        darkOrange: {
            main: '#FF863D',
        },
        primaryRed: {
            main: '#FF644E',
        },
        grayBackground: {
            main: '#F6F5F5',
        },
    },
    typography: {
        // title
        h1: {
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 16,
            '@media (max-width:600px)': {
                fontSize: 24,
                marginBottom: 12,
            },
        },
        // subtitle
        h2: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            '@media (max-width:600px)': {
                fontSize: 18,
                marginBottom: 12,
            },
        },
        // more sizes to use
        h3: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
        },
        // for description text, post
        body1: {
            fontSize: 16,
        },
        // if smaller text is needed
        body2: {
            fontSize: 14,
        },
        // for links, buttons
        button: {
            fontSize: 16,
            '@media (max-width:600px)': {
                fontSize: 14,
            },
        },
        fontFamily: [
            'Poppins',
            'Noto Sans TC',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            tablet: 640,
            laptop: 1024,
            desktop: 1280,
        },
    },
    spacing: 4,
});

/*
theme.spacing(2) = 4 * 2 = 8px
theme.spacing(1, 2) = 4px 8px
theme.spacing(1, auto) = 4px auto
*/

/*
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/
