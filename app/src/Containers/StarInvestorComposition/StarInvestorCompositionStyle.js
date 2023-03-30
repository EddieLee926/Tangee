const StarInvestorCompositionStyle = (theme) => ({
    summary: {
        display: 'flex',
        justifyContent: 'center',
    },
    blockWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    colorBlock1: {
        width: 300,
        height: '35%',
        borderRadius: 5,
        display: 'flex',
        backgroundColor: theme.palette.primaryOrange.main,
    },
    colorBlock2: {
        width: 300,
        height: '35%',
        borderRadius: 5,
        display: 'flex',
        backgroundColor: theme.palette.primaryRed.main,
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

export default StarInvestorCompositionStyle;
