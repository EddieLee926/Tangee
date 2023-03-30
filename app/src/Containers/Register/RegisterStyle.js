const RegisterStyle = (theme) => ({
    root: {
        paddingTop: 20,
    },
    stepperStyle: {
        backgroundColor: 'unset',
    },
    stepContentWrapper: {
        margin: '0 auto 40px',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: '20px 12px 12px',
    },
    buttons: {
        textAlign: 'right',
        paddingTop: 20,
        '& div': {
            display: 'inline-block',
            marginLeft: 4,
        },
    },
    barGraph: {
        width: '45%',
        height: '100%',
        margin: 0,
        padding: '20px 0px',
        backgroundColor: theme.palette.primaryOrange.main,
    },
    barGraph2: {
        width: '45%',
        height: '100%',
        margin: 0,
        padding: '20px 0px',
    },
    graphWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '45px 0px',
    },
    image: {
        height: 200,
        margin: '12px auto 20px',
        display: 'block',
    },
});

export default RegisterStyle;
