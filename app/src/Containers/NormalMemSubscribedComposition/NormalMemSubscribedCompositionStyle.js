const NormalMemSubscribedCompositionStyle = (theme) => ({
    root: {
        padding: '20px 0',
    },
    information: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    summary: {
        display: 'flex',
        justifyContent: 'center',
    },
    selectBox: {
        width: 120,
    },
    blockWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    colorBlock1: {
        width: 450,
        height: 100,
        borderRadius: 5,
        display: 'flex',
        backgroundColor: theme.palette.primaryOrange.main,
        margin: '20px 0px',
    },
    colorBlock2: {
        width: 450,
        height: 100,
        borderRadius: 5,
        display: 'flex',
        backgroundColor: theme.palette.primaryRed.main,
        margin: '20px 0px',
    },
    icon: {
        width: '30%',
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        flex: '1 1 auto',
        alignSelf: 'center',
        '& .MuiTypography-h2': {
            marginBottom: 0,
        },
    },
});

export default NormalMemSubscribedCompositionStyle;
