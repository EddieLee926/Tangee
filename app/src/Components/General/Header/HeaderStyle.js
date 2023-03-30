const HeaderStyle = (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff',
        color: '#000000',
        height: 80,
    },
    toolbar: {
        margin: 'auto',
        width: '100%',
        maxWidth: 1280,
        justifyContent: 'space-between',
    },
    box: {
        display: 'flex',
        alignItems: 'center',
    },
    linkWrap: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    title: {
        [theme.breakpoints.down('xs')]: {
            // color: '#FFFFFF',
        },
    },
    headerPadding: {
        width: '100%',
        height: 90,
    },
    buttonWrap: {
        display: 'flex',
    },
    buttonMargin: {
        marginLeft: theme.spacing(3),
    },
    headerLogo: {
        height: 40,
    },
    rightSection: {
        display: 'flex',
        '& .MuiButtonBase-root': {
            marginRight: 10,
        },
    },
    headerUser: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
});

export default HeaderStyle;
