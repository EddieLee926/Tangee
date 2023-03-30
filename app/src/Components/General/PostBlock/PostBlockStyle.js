const PostBlockStyle = (theme) => ({
    root: {
        width: '100%',
        height: 300,
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
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '45%',
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
        width: '100%',
        height: '55%',
        display: 'flex',
        flexDirection: 'column',
    },
    headline: {
        position: 'relative',
    },
    headimage: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        top: '-50%',
        left: '8%',
        backgroundImage: 'var(--background-image)',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    headname: {
        position: 'relative',
        width: 'fit-content',
        left: '25%',
        paddingTop: '8px',
        marginBottom: '8px',
    },
    title: {
        '& .MuiTypography-h2': {
            marginBottom: '4px',
        },
    },
    titleTime: {
        margin: '8px 0px',
        color: 'gray',
    },
    description: {
        flexGrow: 1,
    },
    time: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    updateTime: {
        verticalAlign: 'super',
    },
});

export default PostBlockStyle;
