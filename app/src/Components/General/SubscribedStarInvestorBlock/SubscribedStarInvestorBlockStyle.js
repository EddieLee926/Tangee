const SubscribedStarInvestorBlockStyle = (theme) => ({
    root: {
        width: 450,
        height: 250,
        position: 'relative',
        display: 'flex',
        '&:hover': {
            boxShadow:
                '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)',
            '& .MuiButtonBase-root div': {
                backgroundSize: '110%',
            },
        },
    },
    infoButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
    },
    buttonBlock: {
        width: '100%',
        display: 'flex',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: '8% 5%',
        position: 'relative',
        position: 'relative',
        backgroundImage: 'var(--background-image)',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: theme.transitions.create(['background-size'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    checkIcon: {
        position: 'absolute',
        top: '40%',
        right: '-8%',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'green',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    details: {
        height: 80,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 2,
        marginBottom: '16px',
    },
    details_item: {
        width: '30%',
    },
    tags: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});

export default SubscribedStarInvestorBlockStyle;
