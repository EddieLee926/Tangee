const RevenuStyle = (theme) => ({
    root: {
        height: 150,
        display: 'flex',
        justifyContent: 'space-between',
    },
    colorBlock: {
        width: '30%',
        height: '100%',
        borderRadius: 5,
        display: 'flex',
        position: 'relative',
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
            marginBottom: 8,
        },
        '& .MuiTypography-h3': {
            marginBottom: 0,
        },
    },
    svgIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 8,
        color: 'white',
        backgroundColor: 'var(--background-color)',
    },
    block1: {
        backgroundColor: theme.palette.primaryOrange.main,
    },
    block2: {
        backgroundColor: theme.palette.darkOrange.main,
    },
    block3: {
        backgroundColor: theme.palette.primaryRed.main,
    },
});

export default RevenuStyle;
