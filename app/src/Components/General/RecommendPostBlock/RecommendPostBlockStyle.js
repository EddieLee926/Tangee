const RecommendPostBlockStyle = (theme) => ({
    root: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        boxShadow: 'none',
        '&:hover': {
            '& .MuiButtonBase-root div': {
                backgroundSize: '105%',
            },
        },
    },
    buttonBlock: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: 5,
        backgroundImage: 'var(--background-image)',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: theme.transitions.create(['background-size'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    content: {
        width: '80%',
        height: '60%',
        maxHeight: 160,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 20px',
    },
    headline: {
        display: 'flex',
    },
    headimage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundImage: 'var(--background-image)',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    headname: {
        margin: '0 0 0 20px',
        flexGrow: 1,
        lineHeight: '50px',
    },
    time: {
        lineHeight: '50px',
    },
    title: {
        '& .MuiTypography-h2': {
            marginBottom: '4px',
        },
    },
});

export default RecommendPostBlockStyle;
