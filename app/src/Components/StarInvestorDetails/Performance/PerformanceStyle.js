const PerformanceStyle = (theme) => ({
    root: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        margin: theme.spacing(8, 0),
        padding: theme.spacing(6, 8),
        backgroundColor: theme.palette.grayBackground.main,
        display: 'flex',
    },
    item: {
        flex: '1 1 auto',
        alignSelf: 'center',
        '& .MuiTypography-h3': {
            marginBottom: 0,
        },
    },
});

export default PerformanceStyle;
