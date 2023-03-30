const SubscribedStarPostStyle = (theme) => ({
    root: {
        backgroundColor: theme.palette.grayBackground.main,
        borderRadius: 5,
        padding: '20px 28px',
    },
    avatar: {
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'var(--background-image)',
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: '0px auto 12px',
        border: `solid 3px ${theme.palette.primaryOrange.main}`,
        padding: '3px',
        backgroundClip: 'content-box',
        transition: theme.transitions.create(['background-size'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    avatarWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        '& div:hover': {
            '& div': {
                backgroundSize: '105%',
            },
        },
    },
});

export default SubscribedStarPostStyle;
