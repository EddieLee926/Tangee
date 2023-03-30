const StarInvestorManagementStyle = () => ({
    graphWrapper: {
        width: '100%',
        height: 350,
        display: 'flex',
        justifyContent: 'space-between',
        margin: '32px 0px',
    },
    lineGraph: {
        width: '40%',
        height: '100%',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        '& .MuiTypography-h2': {
            marginBottom: 4,
        },
    },
    barGraph: {
        width: '55%',
        height: '100%',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        '& .MuiTypography-h2': {
            marginBottom: 4,
        },
    },
    timeText: {
        color: 'gray',
    },
    tagChartSection: {
        display: 'flex',
        justifyContent: 'space-evenly',
        height: 300,
    },
    tagChart: {
        width: 300,
    },
    tagComposition: {
        alignSelf: 'center',
    },
});

export default StarInvestorManagementStyle;
