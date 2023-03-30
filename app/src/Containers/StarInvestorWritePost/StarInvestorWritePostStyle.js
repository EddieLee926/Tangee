const StarInvestorWritePostStyle = (theme) => ({
    root: {
        padding: '0 52px',
    },
    title: {
        display: 'flex',
        '& .MuiTypography-h2': {
            margin: '0 0 0 12px',
            alignSelf: 'center',
        },
        marginBottom: '12px',
        width: 'fit-content',
        position: 'relative',
        zIndex: 10,
    },
    backButton: {
        minWidth: 40,
        height: 40,
        borderRadius: 20,
        padding: 0,
    },
    lineGraph: {
        width: 'fit-content',
        display: 'inline-block',
        marginBottom: '15%',
        '& .MuiTypography-h2': {
            marginBottom: theme.spacing(2),
        },
        margin: 'auto',
    },
    buttonsWrap: {
        display: 'flex',
        '& :nth-child(n)': {
            marginRight: theme.spacing(1),
        },
        width: 'fit-content',
    },
    inputSection: {
        borderLeft: `2px solid gray`,
        padding: '0px 0 0 16px',
        marginBottom: 16,
        position: 'relative',
        zIndex: 5,
    },
    selectedInputSection: {
        borderLeft: `2px solid ${theme.palette.primaryOrange.main}`,
    },
    fakeBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    closeBtn:{
        position: 'absolute',
        right:0,
        top:0
    }
});

export default StarInvestorWritePostStyle;
