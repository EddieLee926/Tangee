const drawerWidth = 240;
const StarInvestorLayoutStyle = (theme) => ({
    root: {
        '&$selected': {
            backgroundColor: 'white',
            '&:hover': {
                backgroundColor: 'white',
            },
        },
        display: 'flex',
    },
    selected: {},
    selectedIcon: {
        color: 'black',
        '&::before': {
            content: '""',
            height: 30,
            width: 3,
            borderRadius: 8,
            backgroundColor: 'black',
            position: 'absolute',
            left: 0,
            top: '20%',
        },
    },
    selectedText: {
        '& .MuiTypography-body1': {
            fontWeight: 'bold',
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(14) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        height: 90,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0, 3),
        minHeight: '100vh',
    },
    arrow: {
        transform: 'rotate(0)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.short,
        }),
    },
    arrowRotate: {
        transform: 'rotateY(180deg)',
    },
    paperAnchorLeft: {
        left: 'unset',
        border: 'none',
    },
    stardrawer: {
        flexGrow: 1,
        backgroundColor: theme.palette.lightOrange.main,
        borderRadius: 5,
    },
    userinfo: {
        width: '100%',
        height: 100,
    },
});

export default StarInvestorLayoutStyle;
