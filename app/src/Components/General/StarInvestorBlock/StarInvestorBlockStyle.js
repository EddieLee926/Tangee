const StarInvestorBlockStyle = (theme) => ({
    root: {
        position: 'relative',
        width: '30%',
        height: 350,
        '&:hover': {
            boxShadow:
                '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)',
            '& .MuiButtonBase-root div': {
                backgroundSize: '110%',
            },
        },
    },
    buttonBlock: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        position: 'relative',
    },
    infoButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: '16px auto',
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
    details: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexGrow: 2,
    },
    details_item: {
        width: '30%',
    },
    tags: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexGrow: 1,
    },
    checkIcon: {
        position: 'absolute',
        bottom: '10%',
        right: '-8%',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'green',
    },
});

export default StarInvestorBlockStyle;
