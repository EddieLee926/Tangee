const LogInStyle = () => ({
    root: {
        display: 'flex',
        width: '90%',
        margin: 'auto',
        padding: '40px 0',
    },
    section1: {
        width: '45%',
        letterSpacing: 1,
    },
    image: {
        width: 250,
        borderRadius: 5,
        display: 'block',
        margin: '20px auto',
    },
    section2: {
        width: '55%',
        '& .MuiTypography-body1': {
            marginBottom: 8,
        },
    },
    loginBox: {
        width: 450,
        height: '100%',
        margin: 'auto',
        padding: '40px 20px 20px',
        backgroundColor: 'white',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
    },
    loginButton: {
        width: '100%',
    },
    divider: {
        margin: '16px 0',
    },
    form: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
});

export default LogInStyle;
