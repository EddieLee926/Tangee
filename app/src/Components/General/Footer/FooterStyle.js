const FooterStyle = (theme) => ({
    root: {
        backgroundColor: theme.palette.grayBackground.main,
        '&::before': {
            content: '""',
            display: 'block',
            height: 5,
            width: '100%',
            background: `linear-gradient(to right,${theme.palette.primaryOrange.main}, ${theme.palette.primaryRed.main})`,
        },
        height: 'auto',
        position: 'relative',
        zIndex: theme.zIndex.drawer + 1,
    },
    bottomLine: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(5, 3),
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            textAlign: 'center',
            padding: theme.spacing(3, 3),
        },
    },
    container: {
        padding: theme.spacing(8, 3),
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            padding: theme.spacing(3, 3),
        },
    },
    linkList: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {},
    },
    linkWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'unset',
        },
    },
    link: {
        color: 'black',
        display: 'block',
        '&:hover': {
            color: theme.palette.hoverOrange.main,
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0 0 4px 0',
        },
    },
    emailinput: {
        display: 'flex',
        borderRadius: 50,
        backgroundColor: theme.palette.lightOrange.main,
        padding: '10px 25px',
        margin: theme.spacing(4, 0, 6, 0),
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            padding: '7px 20px',
            margin: theme.spacing(4, 'auto', 6),
        },
    },
    followlink: {
        padding: 0,
        margin: theme.spacing(0, 4, 0, 0),
        '& .MuiSvgIcon-root': {
            fontSize: 30,
        },
    },
    discription: {
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            margin: theme.spacing(0, 'auto', 4),
        },
    },
    footerLogo: {
        height: 40,
    },
});

export default FooterStyle;
