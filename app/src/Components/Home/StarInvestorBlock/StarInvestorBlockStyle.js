const StarInvestorBlockStyle = (theme) => ({
    root: {
        width: 'calc(100% + 24px)',
        height: 550,
        backgroundColor: theme.palette.lightOrange.main,
        position: 'relative',
        bottom: 10,
        right: 12,
    },
    upperSection: {
        height: '40%',
        display: 'flex',
    },
    text: {
        width: '50%',
        margin: 'auto',
    },
    icon: {
        width: 36,
        height: 36,
        margin: '0 auto 8px',
        borderRadius: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient( 120deg, #FFC446 0%, #FF644E 100%)',
        boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.2)',
        '& .MuiSvgIcon-root': {
            color: 'white',
        },
    },
    lowerSection: {
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        width: '30%',
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column',
    },
    boxText: {
        flexGrow: '1',
    },
    boxContent: {
        height: '70%',
        border: '8px black solid',
        borderBottom: 'none',
        overflowY: 'scroll',
        '& .MuiList-padding': {
            padding: 0,
            '& li:nth-child(even)': {
                backgroundColor: theme.palette.grayBackground.main,
            },
            '& li:nth-child(odd)': {
                backgroundColor: 'white',
            },
        },
    },
    image: {
        width: '100%',
    },
});

export default StarInvestorBlockStyle;
