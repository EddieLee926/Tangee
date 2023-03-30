const ImageStyle = (theme) => ({
    root: { width: 100, height: 100, borderRadius: 50 },
    barGraph: {
        width: '45%',
        height: '100%',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        '& .MuiTypography-h2': {
            marginBottom: 4,
        },
        backgroundColor: theme.palette.primaryOrange.main,
    },
    barGraph2: {
        width: '45%',
        height: '100%',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        '& .MuiTypography-h2': {
            marginBottom: 4,
        },

    },
    graphWrapper: {
        width: '100%',
        height: 120,
        display: 'flex',
        justifyContent: 'space-between',
        margin: '45px 0px',
    },
});

export default ImageStyle;
